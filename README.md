repo létrehozása readme-vel

vscode nyitás, mappa megnyitás

klónozás
git clone ...

cd projectname
code . -r

readme törlése

ha nincs telepítve angular a gépen: npm i @angular/cli -g

ha nincs telepítve json-server: npm i json-server

ng new --name="project-test" --directory . --style scss --routing true --strict (névben a-z vagy -)

bootstrap, font-awesome és jquery telepítése
npm i bootstrap font-awesome jquery

bootstrap, font-awesome és jquery bekötése a projektbe: angular.json
"styles": [
    "./node_modules/font-awesome/css/font-awesome.min.css", 
    "./node_modules/bootstrap/dist/css/bootstrap.min.css", 
    "src/styles.scss"
],
"scripts": [
    "./node_modules/jquery/dist/jquery.js", 
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]

package.json
"start": "ng serve -o",

Első teszt: npm start
Megkérdezi, hozzájárulsz-e adatok kültéséhez. No is jó.
Megnyílik az alkalmazás a böngészőben angular alapértelmezett tartalommal.
Ki is lőhető a futtatás, mert jöhetnek a komponensek.

Főoldal design felépítése - app.component.html
Ehhez érdemes feltenni a Bootstrap 4, Font awesome 4 kiegészítőt Ashok Koyi-tól!
Az html teljes tartalma törölhető, majd...
- bootstrap navbar (megfelelő mepüpontokkal)
- container > row > col a tartalomnak, benne bootstrap jumbotron (megfelelő tartalommal)

Komponensek létrehozása
- ha van oldal komponens, akkor azokat a site/ mappába
- ha egyéb komponens, akkor common/ mappába
- pl: pages/home, site/products vagy common/product-list
ng g c pages/home
ng g c pages/products
ng g c common/navigation
ng g c common/product-list
Létrejönnek a komponensek és az app-module.ts-be be is kötődnek.

Főoldal HTML tartalmának kiszervezése komponensekbe (előkészülés a routingra)
- navbar -> navigation - helyére <app-navigation></app-navigation>
- jumbotron -> home - helyére <router-outlet></router-outlet>

Routing - navigation component html
<a> elemben href="" helyett routerLink="/"

Routing - app-routing.module.ts
- résztvevő komponensek importálása (légyegében ami pages)
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

Routing - routes tömbben útvonalak felvétele
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];

Lista komponens nézetének felépítése - html
- product-list.component.html tartalmának törlése
- b4-table-default

Lista komponens bekötése a lista oldalba - html
- products.component.html tartalámának törlése
- <app-product-list></app-product-list>

Osztály létrehozása
ng g class model/product
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0;
    featured: boolean = true;
    active: boolean = true;

json fájl létrehozása - mockaroo

json fájlt elhelyezése és szerkesztése
src mappával egy szintben server mappa létrehozása
{
  "products": ...
}

HttpClientModule felvétele a app.module.ts-ben
import { HttpClientModule } from '@angular/common/http'; 
imports-nál is!

Service létrehozása
ng g service service/product

Service - importálások
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

Service - constructorba injektálni a HTTPClient-et
(private http: HttpClient)

Service - apiUrl és lista
apiUrl: string = 'http://localhost:3000/products';
list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

Service - getAll és remove metódusok
  getAll(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      products => this.productList$.next(products)
    );
  }

  remove(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${product.id}`);
  }

Products page component ts importálások
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';

Products page component product lista, injektálás, getAll
    productList$: Observable<Product[]> = this.productService.productList$;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getAll();
    }

Products page component html
<app-product-list [products]="productList$ | async"></app-product-list>

Product-list component ts - importálás
import { Product } from 'src/app/model/product';
import { Observable } from 'rxjs';

Product-list component ts - product lista
@Input() products: Product[] | null = [];

Product-list component html
<tr *ngFor="let product of products">
    <td>{{ product.id }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.featured }}</td>
    <td>{{ product.active }}</td>
</tr>