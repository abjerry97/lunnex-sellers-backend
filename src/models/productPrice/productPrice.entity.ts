import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class ProductPrice {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ default: "" })
  @JoinColumn()
  @OneToOne(() => Product, (product) => product.price)
  product?: Product;

  @Column({ default: 10 })
  status?: number;

  @Column({ default: '' })
  rawPrice?: string;

  @Column({ default: '' })
  price?: string;

  @Column({ default: '' })
  priceDollar?: string;

  @Column({ default: '' })
  taxDollar?: string;

  @Column({ default: '' })
  oldPrice?: string;

  @Column({ default: '' })
  oldPriceDollar?: string;

  @Column({ default: '' })
  discount?: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ default: null })
  createdAt?: Date;

  @Column({ default: null })
  deletedAt?: Date;
}
