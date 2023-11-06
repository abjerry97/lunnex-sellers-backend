import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductPrice } from '../productPrice/productPrice.entity';
import { Store } from '../store/store.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  name?: string;

  // @Column({ default: null })
  // @ManyToOne(() => Store, (store) => store.products) 
  // store?: number;

  @Column({ default: "" })
  image?: string;

  @Column({ default:0 })
  qty?: number;

  @Column({ default: "" })
  description?: string;

  @Column({ default: "0" })
  rating?: string;

  // @Column()
  // reviews: string;
  @Column({ default: "" })
  sold?: string;

  @ManyToOne(() => Store, (store) => store.products)
  store?: Store;

  @Column({ default: "" })
  sku?: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  createdAt?: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  deletedAt?: Date;

  @OneToMany((type) => ProductPrice, (price) => price.productId)
  products?: ProductPrice[];
}
