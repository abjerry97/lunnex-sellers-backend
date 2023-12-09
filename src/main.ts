import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    origin:'http://localhost:3001', //or whatever port your frontend is using
    credentials:true,            
    // optionSuccessStatus:200
});
  await app.listen(3000);
}
bootstrap();
