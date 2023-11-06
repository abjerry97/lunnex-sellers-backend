import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'src/interfaces/user.interface';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
  async create(data: UserInterface) {
    let user = this.usersRepository.create({ ...data, createdAt: new Date() });
    user.stores = [];
    return await this.usersRepository.save(user);
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
