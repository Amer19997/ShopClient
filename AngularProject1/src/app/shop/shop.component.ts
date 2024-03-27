import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
 
import { ShopService } from './shop.service';
import { Product } from '../shared/models/Product';
import { ProductsBrands } from '../shared/models/ProductsBrands';
import { ProductsType } from '../shared/models/ProductsType';
import { ShopParams } from '../shared/models/ShopParams';
 
 

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: ProductsBrands[] = [];
  types: ProductsType[] = [];
   sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];
  totalitems=0 ;
  shopparams: ShopParams = new ShopParams;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getproducts();
    this.getBrands();
    this.getTypes();
  }
  getproducts() {
    //this.shopService.getproducts(this.shopparams).subscribe((data: any) => {
    //  this.products = data.data;
    this.shopService.getproducts(this.shopparams).subscribe({
      next: (response: any) => {
        this.products = response.data
        this.totalitems = response.count
        this.shopparams.pagesize = response.pageSize

      },
      error: error => console.log(error)
    })

  }
  
  
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    })
  }

  onBrandSelected(brandId: number) {
    this.shopparams.BrandId = brandId;
    this.shopparams.pageindex = 1;
    this.getproducts();
  }

  onTypeSelected(typeId: number) {
    this.shopparams.TypeId = typeId;
    this.shopparams.pageindex = 1;
    this.getproducts();
  }

  onSortSelected(event: any) {
    this.shopparams.Sort = event.target.value;
    this.getproducts();
  }

  onPageChanged(event: any) {
    if (this.shopparams.pageindex !== event) {
      this.shopparams.pageindex = event;
      this.getproducts();
    }
  }

  onSearch() {
    this.shopparams.search = this.searchTerm?.nativeElement.value;
    this.shopparams.pageindex = 1;
    this.getproducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopparams = new ShopParams;
    this.getproducts();
  }

}
