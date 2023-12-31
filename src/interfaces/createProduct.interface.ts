import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator"; 

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
