import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [

      // {
      //   product: 'https://via.placeholder.com/150',
      //   name: 'Snickers',
      //   price: 150,
      //   quantity: 1,
      //   id: 1
      // }

    ]
  }
  dataSource:Array<CartItem>=[];
  displayedColumn: Array<string>=[
    'product',
    'name',
    'price',
    'quantity',
    'action'
  ]


  constructor() { }

  ngOnInit(): void {
    this.dataSource=this.cart.items
  }

}