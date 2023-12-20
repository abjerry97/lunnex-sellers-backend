import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInterface } from 'src/interfaces/product.interface';
import { Product } from 'src/models/product/product.entity';
import { Store } from 'src/models/store/store.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common'; 
import { CreateProductInterface } from 'src/interfaces/createProduct.interface';
import { ProductPrice } from 'src/models/productPrice/productPrice.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductPrice)
    private productsPriceRepository: Repository<ProductPrice>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
  async findAllUserProducts(id: number): Promise<Product[] | null> {
    try {
      const products = await this.productsRepository.find({
        where: {
          store: {
            user: { id }, //status:10
          },
        },
        relations: ['price'],
      });
      if (!products || products?.length == 0) return null;  
      return products;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Internal Server Error' },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  findOne(sku: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({ sku });
  }
  async create(data: CreateProductInterface, id: number) {
    // try {
      let store = await this.storesRepository.findOne({
        where: { user: { id } },
        relations: ['products'],
      }); 
      if (!store)
        throw new HttpException(
          { message: 'Store not found, or not yet created' },
          HttpStatus.NOT_FOUND,
        );
      let product = new Product();
      let productPrice = new ProductPrice();
      productPrice.price = data.price || '';
      product = {
        ...data,
        createdAt: new Date(),
      } as Product;
   
      await this.productsPriceRepository.save(productPrice);
      product.price = productPrice
      const newProduct = await this.productsRepository.save(product);
      store?.products.push(newProduct);
      await this.storesRepository.save(store as Store);
      return newProduct;
    // } catch (error) {
    //   console.log(error)
    //   throw new HttpException(
    //     { message: 'Something Went Wrong' },
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  
  }
  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
