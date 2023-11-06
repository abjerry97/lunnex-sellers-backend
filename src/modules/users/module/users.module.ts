import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../service/users.service';
import { User } from 'src/models/user/user.entity';
import { UsersController } from '../controller/users.controller'; 
import { Repository } from 'typeorm';
import { Store } from 'src/models/store/store.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User,Store])],
  providers: [TypeOrmModule,UsersService,], // Provide UsersService
  controllers: [UsersController],
})
export class UsersModule { 
}
