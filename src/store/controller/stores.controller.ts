 
import { Body, Controller, Get, Post } from '@nestjs/common';
import { resolve } from 'path';
import { StoresService } from '../service/stores.service';
import { Store } from 'src/models/store/store.entity';
import { StoreInterface } from 'src/interfaces/store.interface';

@Controller('stores')
export class StoresController {
constructor(private readonly storesService: StoresService){}

@Get()
getStores(): Promise<Store[] | null> {
  return this.storesService.findAll();
}
@Post()
createStore(@Body() data: StoreInterface): Promise<Store | null> {
  return this.storesService.create(data);
} 


}


 


