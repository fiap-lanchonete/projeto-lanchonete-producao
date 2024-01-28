import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OrderController } from 'src/adapters/controllers/order.controller';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { GetQueueOrderUseCase } from 'src/application/usecases/get-queue.usecase';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    OrderService,
    GetQueueOrderUseCase,
    {
      provide: 'OrderRepository',
      useClass: OrderRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    PrismaHelper,
  ],
})
export class AppModule {}
