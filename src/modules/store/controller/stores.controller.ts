import {
  Body,
  Controller,
  Get, 
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'; 
import { StoresService } from '../service/stores.service';
import { Store } from '../../../models/store/store.entity';
import { StoreInterface } from '../../../interfaces/store.interface'
import { FirebaseAuthGuard } from '../../auth/guards/firebase-auth.guard';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  getStores(): Promise<Store[] | null> {
    return this.storesService.findAll();
  }
  @Get('/user')
  @UseGuards(FirebaseAuthGuard)
  getUserStore(@Req() req: any): Promise<Store | null> {
    const user = req.user;
    return this.storesService.findOneByUserId(+user.id);
  }
  @Get('/user/check')
  @UseGuards(FirebaseAuthGuard)
  checkUserStore(@Req() req: any): Promise<Store | null> {
    const user = req.user;
    return this.storesService.checkUserStorebyUserId(+user.id);
  }
  @Post()
  @UseGuards(FirebaseAuthGuard)
  createStore(@Req() req: any,@Body() data: StoreInterface): Promise<Store | null> {
    const user = req.user;
    return this.storesService.create(data,user.id);
  }
}
