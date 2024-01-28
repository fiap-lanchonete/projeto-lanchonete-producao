import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let mockOrderRepository: OrderRepository;

  beforeEach(() => {
    const mockPrismaHelper = {} as PrismaHelper;
    mockOrderRepository = new OrderRepository(mockPrismaHelper);
    orderService = new OrderService(mockOrderRepository);
  });

  describe('findByStatus', () => {
    it('should return an array of orders', async () => {
      const mockedOrders: Order.Data[] = [
        {
          id: 1,
          order_id: 2,
          status: 'IN_PREPARATION',
          user_id: 23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(mockOrderRepository, 'findByStatus')
        .mockResolvedValue(mockedOrders);
      const result = await orderService.findByStatus('IN_PREPARATION');
      expect(result).toBeDefined();
    });
  });
});
