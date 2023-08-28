/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import { enableCors } from '@nestjs/express';

async function bootstrap() {
  dotenv.config();
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001', // Set your allowed origin(s)
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  
  await app.listen(4000);
}
bootstrap();
