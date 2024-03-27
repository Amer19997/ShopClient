import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopParams } from '../shared/models/ShopParams';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/Product';
import { ProductsType } from '../shared/models/ProductsType';
import { ProductsBrands } from '../shared/models/ProductsBrands';
import { environment } from '../../environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient)
  {

  }
  getproducts(shopparams: ShopParams)
  {
    let params = new HttpParams();
    if (shopparams.BrandId) params = params.append("brandId", shopparams.BrandId);
    if (shopparams.TypeId) params = params.append("typeId", shopparams.TypeId);
    if (shopparams.Sort) params = params.append("sort", shopparams.Sort);
    if (shopparams.pageindex) params = params.append("PageIndex", shopparams.pageindex);
    if (shopparams.search) params = params.append("Search", shopparams.search);

    return this.http.get<Pagination<Product>[]>(this.baseUrl + '/Products', {params});
  }
  getproduct(id: number) {
    return this.http.get<Product>(this.baseUrl + '/Products/'+id)
  }
  getBrands() {
    return this.http.get<ProductsBrands[]>(this.baseUrl + '/Products/Brands');
  }
  getTypes() {
    return this.http.get<ProductsType[]>(this.baseUrl + '/Products/Types');
  }
}
