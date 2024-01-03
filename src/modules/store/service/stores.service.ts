import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreInterface } from '../../../interfaces/store.interface';
import { Store } from '../../../models/store/store.entity';
import { User } from '../../../models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Store[]> {
    return this.storesRepository.find();
  }

  findOne(id: number): Promise<Store | null> {
    return this.storesRepository.findOneBy({ id });
  }

  async findOneByUserId(userId: number): Promise<Store | null> {
    const store = await this.storesRepository.findOneBy({
      user: { id: +userId },
    });
    console.log(store);
    if (!store) {
      throw new HttpException(
        { message: 'Store not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return store;
  }

  async checkUserStorebyUserId(userId: number): Promise<Store | null> {
    try {
      const store = await this.storesRepository.findOneBy({
        user: { id: +userId },
      });
      console.log(store)
      if (!store) {
       return null;
      }
      return store;
    } catch (err) {
      throw new HttpException(
        { message: 'Internal Error' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(data: StoreInterface, id: number) {
    let store = await this.storesRepository.findOneBy({
      user: { id: id },
    });
    console.log("store",store,id)
    if (store)
      throw new HttpException(
        { message: 'Store is Dupllicated' },
        HttpStatus.NOT_FOUND,
      );
    let user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['stores'],
    });
    if (!user)
      throw new HttpException(
        { message: 'User not found, or already deleted' },
        HttpStatus.NOT_FOUND,
      );
    console.log(user);
    store = new Store();
    store = {
      ...data,
      createdAt: new Date(),
    } as Store;
    const newStore = await this.storesRepository.save(store);
    user.stores.push(newStore);
    await this.usersRepository.save(user as User);
    return newStore;
  }

  async remove(id: number): Promise<void> {
    await this.storesRepository.delete(id);
  }
}

// "icons": [
//     {
//       "src": "/assets_hy/manifest/jumia/icons/icon_512x512.7e9ac882f66f1aa03b5c5e095f02d938.png",
//       "sizes": "512x512",
//       "type": "image/png"
//     },
//     {
//       "src": "/assets_hy/manifest/jumia/icons/icon_192x192.e16107a390641a16872a2683ed2ec616.png",
//       "sizes": "192x192",
//       "type": "image/png"
//     }
//   ],
//   "name": "Jumia Nigeria",
//   "short_name": "Jumia",
//   "orientation": "portrait",
//   "display": "standalone",
//   "start_url": "https://www.jumia.com.ng/",
//   "background_color": "#ffffff",
//   "theme_color": "#ffffff"
