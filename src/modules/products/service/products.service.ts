import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInterface } from 'src/interfaces/product.interface'; 
import { Product } from 'src/models/product/product.entity';
import { Store } from 'src/models/store/store.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }
  async create(data: ProductInterface) {
    
    let store  =await this.storesRepository.findOne({ where: { id: 1 }, relations: ['products'] })

    if(!store) 
    throw new HttpException({message: 'Store not found, or already deleted'}, HttpStatus.NOT_FOUND);
    let product = new Product();
    product = {
      ...data,
      createdAt: new Date(),
    } as Product;

    const newProduct = await this.productsRepository.save(product);
    store?.products.push(newProduct) 
    // store
    await this.storesRepository.save(store as Store); 
    return newProduct
  }
  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
