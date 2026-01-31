import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger em PT-PT
  const config = new DocumentBuilder()
    .setTitle('Pizzaria Rural API')
    .setDescription('Documentação da API para o sistema da Pizzaria Rural')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS para permitir acesso do frontend
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap().catch((err) => {
  console.error(err);
});
