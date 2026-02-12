import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerConfig } from '../backend/src/logger.config';

let cachedApp: any;

export default async (req: any, res: any) => {
  if (!cachedApp) {
    try {
      const app = await NestFactory.create(AppModule, {
        logger: loggerConfig,
        rawBody: true,
      });

      app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }));

      app.enableCors();
      await app.init();
      cachedApp = app.getHttpAdapter().getInstance();
    } catch (err) {
      console.error('Error bootstrapping NestJS on Vercel:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
  }
  return cachedApp(req, res);
};
