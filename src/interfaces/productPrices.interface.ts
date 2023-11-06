export interface ProductPricesInterface {
  id: number;
  productId: number;
  rawPrice: string;
  price: string;
  priceDollar: string;
  taxDollar: string;
  oldPrice: string;
  oldPriceDollar: string;
  discount: string;
}
