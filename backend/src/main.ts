import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { loggerConfig } from './logger.config';
import * as fs from 'fs';
import * as path from 'path';

let cachedApp: any;

async function bootstrap() {
  if (cachedApp) return cachedApp;

  if (!process.env.VERCEL) {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
  }

  const app = await NestFactory.create(AppModule, {
    logger: loggerConfig,
    rawBody: true,
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

  if (process.env.VERCEL) {
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
    return cachedApp;
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicação a correr em: http://localhost:${port}`);
  cachedApp = app;
  return app;
}

// Handler para o Vercel (Serverless Function)
export default async (req: any, res: any) => {
  const instance = await bootstrap();
  instance(req, res);
};

// Inicialização para ambientes não-Vercel
if (!process.env.VERCEL) {
  bootstrap();
}
