import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common'; 
import { ProductsService } from '../service/products.service';
import { Product } from 'src/models/product/product.entity'; 
import { FirebaseAuthGuard } from 'src/modules/auth/guards/firebase-auth.guard';
import { CreateProductInterface } from 'src/interfaces/createProduct.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get('user')
  @UseGuards(FirebaseAuthGuard)
  getUserProducts(@Req() req: any): Promise<Product[] | null> {
    const user = req.user;
    return this.productsService.findAllUserProducts(user.id);
  }

  @Get('/:productId')
  getProduct(@Param('productId') productId: string): Promise<Product | null> {
    return this.productsService.findOne(productId);
  }

  @Get()
  getProducts(): Promise<Product[] | null> {
    return this.productsService.findAll();
  }
  @Post()
  @UseGuards(FirebaseAuthGuard)
  createProduct(@Body() data: CreateProductInterface,@Req() req: any): Promise<Product | null> {
    const user = req.user
    return this.productsService.create(data, user.id);
  }
}
