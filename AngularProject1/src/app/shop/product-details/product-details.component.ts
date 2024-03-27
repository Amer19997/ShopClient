import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { Product } from '../../shared/models/Product';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';
 
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product?: Product;
   
  constructor(private shopService: ShopService, private route: ActivatedRoute, private bcsercice: BreadcrumbService) {
    this.bcsercice.set('@productDetails','  ');
  }

    ngOnInit(): void {


    this.getProduct();
    }
  getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) this.shopService.getproduct(+id).subscribe({
      next: product => {
        this.product = product;
        this.bcsercice.set('@productDetails', product.name);

      },
      
      error: error => console.log(error)

        
      
      })
  }
}
