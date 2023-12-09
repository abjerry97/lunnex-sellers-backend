import { PassportStrategy } from '@nestjs/passport';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { FirebaseService } from '../services/firebase.service';
import { UsersService } from 'src/modules/users/service/users.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor(private readonly firebase: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  @Inject(UsersService)
  private readonly userService: UsersService;

  async validate(token: string) {
    const firebaseUser = await this.firebase.instance
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      throw new UnauthorizedException('User not found');
    }

    let user: any = await this.userService.findOneByUid(firebaseUser.uid); 
    if (!user) user = await this.userService.create(firebaseUser);

    return user;
  }
}
