import { Order } from '@prisma/client';
import { OrderController } from 'src/adapters/controllers/order.controller';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { GetQueueOrderUseCase } from 'src/application/usecases/get-queue.usecase';
import { MarkOrderAsFinishedUseCase } from 'src/application/usecases/mark-order-as-finished.usecase';
import { MarkOrderAsInPreparationUseCase } from 'src/application/usecases/mark-order-as-in-preparation.usecase';
import { MarkOrderAsReadyUseCase } from 'src/application/usecases/mark-order-as-ready.usecase';

describe('OrderController', () => {
  let orderController: OrderController;
  let getQueueUseCase: GetQueueOrderUseCase;
  let markOrderAsInPreparationUseCase: MarkOrderAsInPreparationUseCase;
  let markOrderAsFinishedUseCase: MarkOrderAsFinishedUseCase;
  let markOrderAsReadyUseCase: MarkOrderAsReadyUseCase;
  let mockOrderService: OrderService;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    mockOrderService = new OrderService(mockOrderRepository);
    getQueueUseCase = new GetQueueOrderUseCase(mockOrderService);
    markOrderAsInPreparationUseCase = new MarkOrderAsInPreparationUseCase(
      mockOrderService,
    );
    markOrderAsFinishedUseCase = new MarkOrderAsFinishedUseCase(
      mockOrderService,
    );
    markOrderAsReadyUseCase = new MarkOrderAsReadyUseCase(mockOrderService);

    orderController = new OrderController(
      getQueueUseCase,
      markOrderAsInPreparationUseCase,
      markOrderAsReadyUseCase,
      markOrderAsFinishedUseCase,
    );
  });

  describe('queueOfOrders', () => {
    it('should return a queue of orders', async () => {
      const mockedQueue: Order.Data[] = [
        {
          id: 1,
          order_id: 2,
          status: 'IN_PREPARATION',
          user_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(getQueueUseCase, 'execute').mockResolvedValue(mockedQueue);
      const result = await orderController.queueOfOrders();
      expect(result).toBeDefined();
    });
  });

  describe('markAsInPreparation', () => {
    it('should mark the order as in preparation', async () => {
      const mockedOrder: Order.Data = {
        id: 1,
        order_id: 2,
        status: 'IN_PREPARATION',
        user_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(markOrderAsInPreparationUseCase, 'execute')
        .mockResolvedValue(mockedOrder);
      const result = await orderController.markAsInPreparation({
        order_id: 2,
      });
      expect(result).toBeDefined();
    });
  });

  describe('markAsReady', () => {
    it('should mark the order as ready', async () => {
      const mockedOrder: Order = {
        id: 1,
        order_id: 2,
        status: 'READY',
        user_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(markOrderAsReadyUseCase, 'execute')
        .mockResolvedValue(mockedOrder);
      const result = await orderController.markAsReady('1');
      expect(result).toBeDefined();
    });
  });

  describe('markAsFinished', () => {
    it('should mark the order as finished', async () => {
      const mockedOrder: Order = {
        id: 1,
        order_id: 2,
        status: 'FINISHED',
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(markOrderAsFinishedUseCase, 'execute')
        .mockResolvedValue(mockedOrder);
      const result = await orderController.markAsFinished('1');
      expect(result).toBeDefined();
    });
  });
});
