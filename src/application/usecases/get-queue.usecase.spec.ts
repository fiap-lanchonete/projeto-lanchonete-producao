import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { GetQueueOrderUseCase } from 'src/application/usecases/get-queue.usecase';

describe('GetOrderQueueUseCase', () => {
  let getOrderQueueUseCase: GetQueueOrderUseCase;
  let mockOrderService: OrderService;
  let order;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    mockOrderService = new OrderService(mockOrderRepository);

    getOrderQueueUseCase = new GetQueueOrderUseCase(mockOrderService);

    order = {
      id: 1,
      idempotent_key: '123',
      status: 'IN_PREPARATION',
      payment_id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe('execute', () => {
    it('should return a queue of orders', async () => {
      const mockedQueue: Order.Data[] = [order];

      jest
        .spyOn(mockOrderService, 'findManyToQueue')
        .mockResolvedValue(mockedQueue);

      const result = await getOrderQueueUseCase.execute();

      expect(result).toEqual(mockedQueue);
    });
  });
});
