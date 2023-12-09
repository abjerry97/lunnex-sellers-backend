 

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  app.enableCors({
    origin: [
      'https://lunnex-seller-kdqsn3cto-abjerry97.vercel.app/',
      'https://lunnex-seller-git-main-abjerry97.vercel.app/',
      'https://lunnex-seller-abjerry97.vercel.app/',
      'https://lunnex-seller.vercel.app/',
      'http://localhost:3001',
      'http://localhost:3000',
    ], //or whatever port your frontend is using
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // optionSuccessStatus:200
  });
  await app.listen(3000);
}
bootstrap();
