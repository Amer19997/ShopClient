import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 import { Product } from '../shared/models/product';
import { Basket, BasketItem, BasketTotals, CustomerBasket } from '../shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = "http://localhost:5056/api/";
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient)
  {
  }
  
  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }
  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }
  addItemToBasket(item: Product , quantity = 1) {
    const itemtoAdd = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemtoAdd, quantity);
    this.setBasket(basket);

  }
    addOrUpdateItem(items: BasketItem[], itemtoAdd: BasketItem, quantity: number): BasketItem[] {
      const item = items.find(x => x.id === itemtoAdd.id);
      if (item) item.quantity += quantity;
      else {
        itemtoAdd.quantity = quantity;
        items.push(itemtoAdd);
      }
      return items;
    }
 private   createBasket(): CustomerBasket {
   const basket = new CustomerBasket();
   localStorage.setItem('basket_id', basket.id);
   return basket;

    }
  private mapProductItemToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type:item.productType

    }
  }
  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, total, subtotal });
  }

  
}
