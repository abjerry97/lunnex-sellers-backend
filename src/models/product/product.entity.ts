import {
  Entity,
  Column, 
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ProductPrice } from '../productPrice/productPrice.entity';
import { Store } from '../store/store.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name?: string;

  // @Column({ default: null })
  // @ManyToOne(() => Store, (store) => store.products)
  // store?: number;

  @Column({ default: '' })
  image?: string;

  @Column({ default: 0 })
  qty?: number;

  @Column({ default: 0 })
  status?: number;

  @Column({ default: '' })
  description?: string;

  @Column({ default: '0' })
  rating?: string;

  // @Column()
  // reviews: string;
  @Column({ default: 0 })
  sold?: number;

  @JoinColumn()
  @ManyToOne(() => Store, (store) => store.products)
  store?: Store;

  @Column({ default: '' })
  sku?: string;

  // @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  @Column({ default: null })
  createdAt?: Date;

  // @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  @Column({ default: null })
  deletedAt?: Date;

  @OneToOne(() => ProductPrice, (price) => price.product)
  price?: ProductPrice;
}
