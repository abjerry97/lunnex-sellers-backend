
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Store } from '../store/store.entity';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  
  @OneToMany(() => Store, store => store.user)
  stores: Store[];
  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
  @Column({default:null})
  createdAt?: Date;
  @Column({default:null})
  deletedAt?: Date;
}