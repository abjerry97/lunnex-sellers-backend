import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreInterface } from 'src/interfaces/store.interface';
import { Product } from 'src/models/product/product.entity';
import { Store } from 'src/models/store/store.entity';
import { User } from 'src/models/user/user.entity';
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
  async create(data: StoreInterface) {
    let user = await this.usersRepository.findOne({
      where: { id: 1 },
      relations: ['stores'],
    });
    if (!user)
      throw new HttpException(
        { message: 'User not found, or already deleted' },
        HttpStatus.NOT_FOUND,
      );
    let store = new Store();
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
