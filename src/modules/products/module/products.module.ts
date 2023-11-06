import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../service/products.service';
import { ProductsController } from '../controller/products.controller';
import { Product } from 'src/models/product/product.entity';
import { ProductPrice } from 'src/models/productPrice/productPrice.entity';
import { Store } from 'src/models/store/store.entity';
 

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductPrice,Store])],
    providers: [TypeOrmModule,ProductsService,], // Provide UsersService
    controllers: [ProductsController],
  })
  export class ProductsModule { 
  }
  

  