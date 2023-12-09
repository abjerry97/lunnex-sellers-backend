import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from '../users/module/users.module';
import { ProductsModule } from '../products/module/products.module';
import { User } from '../../models/user/user.entity';
import { Store } from '../../models/store/store.entity';
import { Product } from '../../models/product/product.entity';
import { ProductPrice } from '../../models/productPrice/productPrice.entity';
import { StoresModule } from '../store/module/stores.module';
import { AuthModule } from '../auth/module/auth.module';
import { LoggerMiddleware } from './logger.middleware';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', //mysql
      host: 'ep-long-boat-47297755.us-east-2.aws.neon.tech', //localhost
      port: 5432, //3306
      username: 'abiodunjeremiah303', //root
      password: 'W1A3piXayvYm', //315138
      database: 'lunnex',
      entities: [
        User,
        Store,
        Product,
        ProductPrice /* Add other entities from ProductsModule here */,
      ],
      synchronize: true,
      autoLoadEntities: true,
      // logging: true,
      ssl: true,
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    StoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
