import { OrderController } from 'src/adapters/controllers/order.controller';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { GetQueueOrderUseCase } from 'src/application/usecases/get-queue.usecase';

describe('OrderController', () => {
  let orderController: OrderController;
  let getQueueUseCase: GetQueueOrderUseCase;
  let mockOrderService: OrderService;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    mockOrderService = new OrderService(mockOrderRepository);
    getQueueUseCase = new GetQueueOrderUseCase(mockOrderService);

    orderController = new OrderController(getQueueUseCase);
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
});
