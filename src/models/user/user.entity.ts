import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Store } from '../store/store.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  status?: number;

  @Column({unique:true})
  uid: string;

  @OneToMany(() => Store, (store) => store.user)
  stores: Store[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: null })
  createdAt?: Date;

  @Column({ default: null })
  deletedAt?: Date;
}
