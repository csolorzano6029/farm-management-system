import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: '*', // Cambia esto según tus necesidades (por ejemplo, un dominio específico)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
