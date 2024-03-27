import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
 import { PagingHeaderComponent } from '../shared/paging-header/paging-header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
 


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent
    
   ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
     
   ],
  exports: [
    ShopComponent
    
  ]
})
export class ShopModule { }
