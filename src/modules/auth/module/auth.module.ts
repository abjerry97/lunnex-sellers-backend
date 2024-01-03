import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from '../strategies/firebase-auth.strategy';
import { FirebaseService } from '../services/firebase.service';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from 'src/models/user/user.entity';
import { UsersModule } from 'src/modules/users/module/users.module';
import { UsersService } from 'src/modules/users/service/users.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'firebase-auth' }),
    UsersModule,
  ],

  providers: [
    FirebaseAuthStrategy,
    FirebaseAuthGuard,
    FirebaseService,
    UsersService,
  ],
  exports: [FirebaseAuthGuard, FirebaseService],
})
export class AuthModule {}
