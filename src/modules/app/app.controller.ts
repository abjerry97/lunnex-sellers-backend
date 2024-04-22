import {  Controller, Get } from '@nestjs/common';
import { CreateProductInterface } from '../../interfaces/createProduct.interface';
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
