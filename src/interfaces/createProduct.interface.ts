import { IsAlpha, isEmail, IsNotEmpty, IsNumber, IsString, isString, Min, MinLength } from "class-validator";
import { ProductPricesInterface } from "./productPrices.interface";
import { StoreInterface } from "./store.interface";

export class CreateProductInterface {

  id: number;

  @IsNotEmpty()
  @IsString() 
  @MinLength(5)
  name: string;
  image?: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  qty: number;
  @IsNotEmpty()
  @IsString() 
  price: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description?: string;
  rating?: string;
  reviews?: string[];
  sold?: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  sku?: string;
}
