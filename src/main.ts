import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.get(PrismaHelper, { strict: false });

  const config = new DocumentBuilder()
    .setTitle('Lanchonete API')
    .setDescription('API para a lanchonete')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
