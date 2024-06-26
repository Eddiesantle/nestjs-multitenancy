import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Partner1Module } from './partner1.module';

async function bootstrap() {
  const app = await NestFactory.create(Partner1Module);
  const port = 3000;

  await app.listen(port, () => {
    const address = app.getHttpServer().address();
    const host = address.address === '::' ? 'localhost' : address.address; // Handling IPv6 addresses
    Logger.log(`Application is running on: http://${host}:${port}`, 'Bootstrap');
  });
}
bootstrap();
