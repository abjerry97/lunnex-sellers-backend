import { ProductPricesInterface } from "./productPrices.interface";
import { StoreInterface } from "./store.interface";

export class ProductInterface {
  id: number;
  name: string;
  image?: string;
  store?:StoreInterface;
  qty?: number;
  price?:ProductPricesInterface;
  description?: string;
  rating?: string;
  reviews?: string[];
  sold?: string;
  sku?: string;
}
