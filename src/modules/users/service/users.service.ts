import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { User } from '../../../models/user/user.entity';
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
  async create(data: any) {
    let existingUser = await this.usersRepository.findOneBy({ uid: data?.uid });
    if (existingUser)
      throw new HttpException(
        {
          message: 'User already exist',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    let user = new User();
    user.uid = data.uid;
    user.email = data.email;
    user.name = data?.name || "";
    user.stores = [];
    return await this.usersRepository.save(user);
  }

  async findOneByUid(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ uid: id });
    // if (!user)
    //   throw new HttpException(
    //     {
    //       message: 'User not found, or already deleted',
    //       statusCode: HttpStatus.NOT_FOUND,
    //     },
    //     HttpStatus.NOT_FOUND,
    //   );
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
