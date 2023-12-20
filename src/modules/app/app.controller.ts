import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductInterface } from 'src/interfaces/createProduct.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,) {}

  @Get()
  getHello(createUserDto: CreateProductInterface): object {
    console.log("createUserDto",createUserDto)
    return this.appService.getHello();
  } 
}
