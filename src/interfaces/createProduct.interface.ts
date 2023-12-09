import { ProductPricesInterface } from "./productPrices.interface";
import { StoreInterface } from "./store.interface";

export class CreateProductInterface {
  id: number;
  name: string;
  image?: string; 
  qty?: number;
  price?:string;
  description?: string;
  rating?: string;
  reviews?: string[];
  sold?: string;
  sku?: string;
}
