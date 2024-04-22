import { Module } from '@nestjs/common';
import { StoresController } from '../controller/stores.controller';
import { StoresService } from '../service/stores.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../../models/product/product.entity'; 
import { Store } from '../../../models/store/store.entity';
import { User } from '../../../models/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Store,Product,User])],
    providers: [TypeOrmModule,StoresService,], // Provide UsersService
    controllers: [StoresController],
  })
export class StoresModule {}

 