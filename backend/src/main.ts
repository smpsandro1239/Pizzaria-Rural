import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { loggerConfig } from './logger.config';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const app = await NestFactory.create(AppModule, {
    logger: loggerConfig,
  });

  const config = new DocumentBuilder()
    .setTitle('Pizzaria Rural API')
    .setDescription('Documentação da API para o sistema da Pizzaria Rural')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicação a correr em: http://localhost:${port}`);
}
bootstrap();
