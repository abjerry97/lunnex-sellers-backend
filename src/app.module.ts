import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersService } from './modules/users/service/users.service';
import { UsersController } from './modules/users/controller/users.controller';
import { UsersModule } from './modules/users/module/users.module';
import { ProductsModule } from './modules/products/module/products.module';
import { ProductsService } from './modules/products/service/products.service';
import { User } from './models/user/user.entity';
import { StoresModule } from './store/module/stores.module';
import { Store } from './models/store/store.entity'; 
import { Product } from './models/product/product.entity';
import { ProductPrice } from './models/productPrice/productPrice.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '315138',
      database: 'lunnexsellers',
      entities: [User, Store, Product, ProductPrice /* Add other entities from ProductsModule here */],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    ProductsModule,
    StoresModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
