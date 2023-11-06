
import { Entity, Column,OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Store{
  @PrimaryGeneratedColumn()
  id: number;

 
  @ManyToOne(() => User, (user) => user.stores)
  user?: User;

  
  @Column({ default: 10 })
  status?: number;

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  email?: string;
  
  @Column({ default: "" })
  link: string;

  @Column({ default: "" })
  welcomeText?: string;

  @Column({ default: "" })
  logo?: string;


  @Column({ default: "" })
  category?: string; 
   
  @Column({ default: "" })
  background?: string;
 

  @OneToMany(() => Product, product => product.store)
  products: Product[];

  @Column({ default: true })
  isActive?: boolean;
  
  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  createdAt?: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  deletedAt?: Date;
}