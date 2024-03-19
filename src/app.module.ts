import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OrderController } from 'src/adapters/controllers/order.controller';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { GetQueueOrderUseCase } from 'src/application/usecases/get-queue.usecase';
import { MarkOrderAsFinishedUseCase } from 'src/application/usecases/mark-order-as-finished.usecase';
import { MarkOrderAsInPreparationUseCase } from 'src/application/usecases/mark-order-as-in-preparation.usecase';
import { MarkOrderAsReadyUseCase } from 'src/application/usecases/mark-order-as-ready.usecase';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    OrderService,
    GetQueueOrderUseCase,
    MarkOrderAsInPreparationUseCase,
    MarkOrderAsReadyUseCase,
    MarkOrderAsFinishedUseCase,
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
