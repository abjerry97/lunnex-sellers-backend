import { Module } from '@nestjs/common';
import {  TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../service/users.service';
import { User } from '../../../models/user/user.entity';
import { UsersController } from '../controller/users.controller';  
import { Store } from '../../../models/store/store.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User,Store])],
  providers: [TypeOrmModule,UsersService,], // Provide UsersService
  controllers: [UsersController],
})
export class UsersModule { 
}
