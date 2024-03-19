import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.RMQ_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.get(PrismaHelper, { strict: false });

  const config = new DocumentBuilder()
    .setTitle('Lanchonete API')
    .setDescription('API para a lanchonete')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(parseInt(process.env.PORT) || 3010);
}
bootstrap();
