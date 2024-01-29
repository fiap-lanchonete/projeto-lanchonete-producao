import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { GetQueueOrderUseCase } from 'src/application/usecases/get-queue.usecase';

describe('GetOrderQueueUseCase', () => {
  let getOrderQueueUseCase: GetQueueOrderUseCase;
  let mockOrderService: OrderService;

  beforeEach(() => {
    const mockOrderRepository = {} as OrderRepository;
    mockOrderService = new OrderService(mockOrderRepository);

    getOrderQueueUseCase = new GetQueueOrderUseCase(mockOrderService);
  });

  describe('execute', () => {
    it('should return a queue of orders', async () => {
      const mockedQueue: Order.Data[] = [
        {
          id: 1,
          order_id: 2,
          status: 'IN_PREPARATION',
          cpf: 23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(mockOrderService, 'findManyToQueue')
        .mockResolvedValue(mockedQueue);

      const result = await getOrderQueueUseCase.execute();

      expect(result).toEqual(mockedQueue);
    });
  });
});
