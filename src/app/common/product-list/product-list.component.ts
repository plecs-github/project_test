import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[] | null = [];

  @Output() delete: EventEmitter<Product> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void { }

  onDelete(product: Product): void {
    this.delete.emit(product);
  }

}