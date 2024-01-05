import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })

  constructor(private _snackBar: MatSnackBar) { }


  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const existingItem = items.find((_item) => _item.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart', 'ok', { duration: 3000 });
  }
  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined
    let filteredItem = this.cart.value.items.map((_item) => {

      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item

        }
      }
      return _item;
    })
    if (itemForRemoval) {
      this.cart.next({ items: filteredItem })
      filteredItem = this.removeFromCart(itemForRemoval, false)
    }
    this._snackBar.open('1 item removed from Cart', 'Ok', { duration: 3000 })

  }


  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity).reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  }


  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is Cleared', 'Ok', {
      duration: 3000
    })

  }


  removeFromCart(item: CartItem, update = true) {
    const filterItems = this.cart.value.items.filter((_item) => _item.id !== item.id)

    if (update) {
      this.cart.next({ items: filterItems })
      this._snackBar.open('1 item removed from Cart', 'Ok', { duration: 3000 })
    }

    return filterItems
  }
}
