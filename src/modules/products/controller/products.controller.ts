 


 
import { Body, Controller, Get, Post } from '@nestjs/common';
import { resolve } from 'path'; 
import { Store } from 'src/models/store/store.entity';
import { StoreInterface } from 'src/interfaces/store.interface';
import { ProductsService } from '../service/products.service';
import { Product } from 'src/models/product/product.entity';
import { ProductInterface } from 'src/interfaces/product.interface';

@Controller('products')
export class ProductsController {
constructor(private readonly productsService: ProductsService){}

@Get()
getStores(): Promise<Product[] | null> {
  return this.productsService.findAll();
}
@Post()
createStore(@Body() data: ProductInterface): Promise<Product | null> {
  return this.productsService.create(data);
} 


}


 


