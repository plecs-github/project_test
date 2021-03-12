# ANGULAR PROJEKT

Ebben a feladatban egy olyan angular projektet valósítunk meg, amely az alábbi feltételeket hívatott teljesíteni
- Új, létező git repóhoz kapcsolódik, annak gyökerébe települ.
- Bootstrapet és FontAwesome-ot használ.
- Két oldal komponenst és egy navigációs menüt is tartalmaz.
- Routing segítségével válthatunk az oldalak között.
- A Home komponensen egy Jumbotron található, benne egy linkkel, amely a lista oldalra vezet routinggal.
- Lista oldalon jeleníti meg az adatokat.
- A lista két komponensből, egy oldal és egy listázó komponensből áll.
- Egyetlen entitással dolgozik (pl.: Product).
- Az adatok json-serverből érkeznek.
- A json állományt mockaroo-val generáljuk.
- A lista oldalról képesek vagyunk törölni elemeket.
- 

### Git Repository létrehozása README.MD-vel
Állítsd be, hogy létrejöjjön a README.MD! Ez azért kell, hogy klónozható legyen a repó.

### VSCode indítása, gyűjtő mappa megnyitása
Nyiss meg a VSCode-ban egy olyan mappát/könyvtárat, ahová majd klónozni tudod az imánt létrehozott git repót!

### Repo klónozása
```
git clone repo-url
```

### Belépés a mappába és beállítás rootnak
```
cd projectname
code . -r
```

### README.MD törlése
Azért kell törölni a README.MD-t, mert a projekt root-jába szeretnénk létrehozni az angular projektünket, ekkor viszont létrejön egy új README.MD és ha az még létezne, hibát dobna.

### Angular telepítése - ha még nem volt
```
npm i @angular/cli -g
```

### Json-server telepítése - ha még nem volt
```
npm i json-server
```

### Új Angular projekt létrehozása - több perc lehet
```
ng new --name="project-test" --directory . --style scss --routing true --strict
```
A kapcsolók, paraméterek jelentése sorban:
--name="project-test" - így adjuk meg a projekt nevét, amelyben a-z vagy - karakterek szerepelhetnek
--directory . - így állítjuk be, hogy a projekt abban a mappában jöjjön létre, ahol épp állunk a vscode-ban (root)
--style scss - így állítjuk be, hogy scss-t használjon (lehet css, vagy sass is)
--routing true - így kapcsoljuk be a rtoutingot
--strict - így kapcsoljuk be a strict módot

### Bootstrap, Font-Awesome és jQuery telepítése
```
npm i bootstrap font-awesome jquery
```

### Bootstrap, Font-Awesome és jQuery bekötése a projektbe
érintett fájl: angular.json
```
"styles": [
    "./node_modules/font-awesome/css/font-awesome.min.css", 
    "./node_modules/bootstrap/dist/css/bootstrap.min.css", 
    "src/styles.scss"
],
"scripts": [
    "./node_modules/jquery/dist/jquery.js", 
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

### Projekt indításánál megnyissa azt a böngészőben
érintett fájl: package.json
```
"start": "ng serve -o",
```

### Első teszt futtatás
```
npm start
```
Itt megkérdezi, hogy hozzájárulsz-e adatok kültéséhez. Választhatjuk a "No"-t is.
Megnyílik az alkalmazás a böngészőben angular alapértelmezett tartalommal.
Sikeres futtatás után a folyamat Ki is lőhető.

### Főoldal design felépítése
érintett fájl: app.component.html

Ehhez érdemes feltenni a Bootstrap 4, Font awesome 4 kiegészítőt Ashok Koyi-tól!
Az html teljes tartalmát töröljük, majd felépítjük a kívánt komponenseket.
Bootstrap navbar (megfelelő mepüpontokkal)
Koji kiegészítővel: b4-navbar-default
container > row > col a tartalomnak, benne Jumbotron a megfelelő tartalommal
Koji kiegészítővel: b4-jumbotron-default

### Komponensek létrehozása
Oldal komponensek - site mappa (p.l: pages/home, site/products)
Egyéb komponensek - common mappa (pl.: common/product-list)
```
ng g c pages/home
ng g c pages/products
ng g c common/navigation
ng g c common/product-list
```
A létrehozott komponensek az app-module.ts-ben is bejegyződnek. Fontos, ha valami okból kifolyólag törölnünk kell egy komponenst, innen is el kell távolítanunk és nem elég a fájlok törlése.

### Főoldal HTML tartalmának kiszervezése komponensekbe (előkészülés a routingra)
- navbar -> navigation - helyére <app-navigation></app-navigation>
- jumbotron -> home - helyére <router-outlet></router-outlet>

### Routing a navbar-ban
érintett fájl: navigation.component.html

<a> elemben ```href=""``` helyett ```routerLink="/"```

### Routing - aktív link class
érintett fájl: navigation.component.html, navigation.component.scss

Ahhoz, hogy az aktív link kapjon egy egyedi css class-t fel kell vegyük az alábbi attribútumot a linkekre:
```
routerLinkActive="link-active
```
A link-active class megjelenését a komponens scss-ében hetározzuk meg egyénileg, ízlés szerint.
Ebben az állapotban a Home mindig megkapja az active class-t. Ahhoz, hogy ez ne így legyen, vizsgálni kell a teljes egyezést az alábbi módon:
```
[routerLinkActiveOptions]="{exact:true}"
```

### Routing 
érintett fájl: app-routing.module.ts

Résztvevő komponensek importálása - légyegében minden, ami a pages mappában található
```
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
```

### Routing - routes tömbben útvonalak felvétele
érintett fájl: app-routing.module.ts
```
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
```

### Lista komponens nézetének felépítése - html
érintett fájl: product-list.component.html

Kitöröljük a teljes html tartalmat, majd elhelyezünk egy táblázatot
Koyi kiegészítővel: b4-table-default

### Lista komponens bekötése a lista oldalba - html
érintett fájl: products.component.html

Kitöröljük a teljes html tartalmat, majd elhelyezzük a product-list komponens szelektorát.
```
<app-product-list></app-product-list>
```

### Osztály létrehozása
Osztály létrehozása:
```
ng g class model/product
```
Osztály felépítése:
```
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  featured: boolean = true;
  active: boolean = true;
```

### Json fájl létrehozása mockaroo-val
https://www.mockaroo.com

### Json fájlt elhelyezése és szerkesztése
Az src mappán kívül, azzal egy szinten létrehozunk egy server mappát, majd áthelyezzük a generált és letöltött json fájlunkat. A fájl neve legyen products.json! A tartalmát egészítsük ki az alábbi módon:
```
{
  "products": ...
}
```

### HttpClientModule felvétele
érintett fájl: app.module.ts
```
import { HttpClientModule } from '@angular/common/http'; 
```
Az imports résznél is fel kell venni!

### Service létrehozása
```
ng g service service/product
```

### Service - modulok, osztály importálása
érintett fájl: service/product.service.ts

Szükségünk lesz a Product osztályra, valamint a HttpClient modulra, továbbá az rxjs-ből a BehaviorSubject-re és a Observable-re.
```
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
```

### Service - constructorba injektálni a HTTPClient-et
érintett fájl: service/product.service.ts
```
constructor(private http: HttpClient) { }
```

### Service - apiUrl és lista felvétele
érintett fájl: service/product.service.ts
```
apiUrl: string = 'http://localhost:3000/products';
list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
```

### Service - getAll és remove metódusok
érintett fájl: service/product.service.ts

Mivel a feladatban egy lista komponensre számítunk ezért ehhez szükség lesz egy getAll() metódusra.
A listán soronként elhelyezhetünk egy törlés gombot is, amely működtetéséhez egy remove() metódus is kelleni fog.
```
  getAll(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      products => this.productList$.next(products)
    );
  }

  remove(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${product.id}`);
  }
```

### Products page component ts importálások
érintett fájl: pages/products.component.ts
```
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
```

### Products page component lista felvétele, service injektálás, getAll() meghívása
érintett fájl: pages/products.component.ts
```
productList$: Observable<Product[]> = this.productService.productList$;

constructor(private productService: ProductService) {}

ngOnInit(): void {
  this.productService.getAll();
}
```

### Products page component html
érintett fájl: pages/products.component.html

A Products oldal komponens nézetében át kell adnunk a lista változót a listázó komponensnek.
A listázó komponensen belül szándékosan más változónevet használunk a listához.
```
<app-product-list [products]="productList$ | async"></app-product-list>
```

### Product-list component ts - importálás
érintett fájl: common/product-list.component.ts

Importáljuk a Product osztályt és az Observable modult.
```
import { Product } from 'src/app/model/product';
import { Observable } from 'rxjs';
```

### Product-list component ts - product lista
érintett fájl: common/product-list.component.ts

Létrehozunk egy products nevű változót, amelynek majd a szülő komponens (Products oldal komponens) átadja a termék listát. A típus kényszerítésnél a null-t is felvesszük, mivel aszinkron érkezik az adat és az első pillanatban még nem lesz benne a Product-ok tömbje.
```
@Input() products: Product[] | null = [];
```

### Product-list component html - táblázat sorok generálása és adat interpoláció
érintett fájl: common/product-list.component.html

```
<tr *ngFor="let product of products">
  <td>{{ product.id }}</td>
  <td>{{ product.name }}</td>
  <td>{{ product.description }}</td>
  <td>{{ product.price }}</td>
  <td>{{ product.featured }}</td>
  <td>{{ product.active }}</td>
</tr>
```

### Törlés gomb elhelyezése
érintett fájl: common/product-list.component.html

A thead-ben létrehozunk egy új cellát a végén
```
<th>Actions</th>
```
A tbody-ben szintén létrehozunk egy új cellát a végén, törlés gombbal.
```
<td>
  <button type="button" class="btn btn-danger">
    <i class="fa fa-trash" aria-hidden="true"></i>
  </button>
</td>
```

### Products oldal komponens törlés metódusa - ts
érintett fájl: pages/products.component.ts

Szükségünk lesz egy törlés metódusta a lista oldal komponensben, amely feliratkozik a service-ünk remove metódusára.
A táblázaton nem ezt a metódust fogjuk direktben meghívni, mert nem itt van a lista képezve, hanem a gyermet product-list komponensben.
```
deleteItem(product: Product): void {
  this.productService.remove(product).subscribe(
    () => {
      this.productService.getAll();
    }
  );
}
```
A feliratkozásban meghívjuk a getAll() metódust is, hogy ezzel újra generáljuk a törlést követően a listát, így a táblázatot is.

### Product-list komponens törlés metódusa - ts
érintett fájl: common/product-list.component.ts

Szükségünk lesz a lista komponensben is egy törlés metódusra. Tulajdonképpen ezt fogjuk meghívni a gombra kattintáskor.
```
onDelete(product: Product): void {
  this.delete.emit(product);
}
```
Ehhez emittálnunk kell, azaz tovább kell küldenünk a click eseményt.
```
@Output() delete: EventEmitter<Product> = new EventEmitter();
```

### Product-list komponens törlés metódusa - html
érintett fájl: common/product-list.component.html

A gomb elemünkre event-bindinggal bekötjük a komponens törlés metódusát és átadjuk neki a sorban szereplő product-ot.
```
(click)="onDelete(product)"
```

### Products oldal komponens törlés metódusa - html
érintett fájl: pages/products.component.html

A product-list szelektorára event-bindiggal ráaggatjuk a törlés metódusát, átadva neki az emittelt eseményt.
Ezzel tudjuk felpumpálni az adatokat egy gyermek komponesból a szülő számára.
```
(delete)="deleteItem($event)"
```