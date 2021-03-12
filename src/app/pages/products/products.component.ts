import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList$: Observable<Product[]> = this.productService.productList$;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll();
  }

  deleteItem(product: Product): void {
    this.productService.remove(product).subscribe(
      () => {
        this.productService.getAll();
      }
    );
  }

}
