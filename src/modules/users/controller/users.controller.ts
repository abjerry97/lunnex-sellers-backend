import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../../../models/user/user.entity'; 
import { UserInterface } from '../../../interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[] | null> {
    return this.usersService.findAll();
  }
  @Post()
  createUser(@Body() data: UserInterface): Promise<User | null> {
    return this.usersService.create(data);
  }
}
