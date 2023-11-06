import { Module } from '@nestjs/common';
import { StoresController } from '../controller/stores.controller';
import { StoresService } from '../service/stores.service';
import { Store } from 'src/models/store/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/product/product.entity';
import { User } from 'src/models/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Store,Product,User])],
    providers: [TypeOrmModule,StoresService,], // Provide UsersService
    controllers: [StoresController],
  })
export class StoresModule {}

 