import { Order } from '@prisma/client';
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

  describe('findManyToQueue', () => {
    it('should return an array of orders', async () => {
      const mockedOrders: Order[] = [
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
        .spyOn(mockOrderRepository, 'findManyToQueue')
        .mockResolvedValue(mockedOrders);
      const result = await orderService.findManyToQueue();
      expect(result).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should return an order', async () => {
      const mockedOrder: Order = {
        id: 1,
        order_id: 2,
        status: 'IN_PREPARATION',
        user_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockOrderRepository, 'findById')
        .mockResolvedValue(mockedOrder);
      const result = await orderService.findById(1);
      expect(result).toBeDefined();
      expect(result).toEqual(mockedOrder);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      const mockedOrder: Order = {
        id: 1,
        order_id: 2,
        status: 'IN_PREPARATION',
        user_id: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockOrderRepository, 'create').mockResolvedValue(mockedOrder);
      const result = await orderService.create({
        order_id: 2,
        status: 'IN_PREPARATION',
        id: 22,
        user_id: 24,
      });
      expect(result).toBeDefined();
      expect(result).toEqual(mockedOrder);
    });
  });

  describe('updateStatus', () => {
    it('should update an order status', async () => {
      const mockedOrder: Order = {
        id: 1,
        order_id: 2,
        status: 'IN_PREPARATION',
        user_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(mockOrderRepository, 'updateStatus')
        .mockResolvedValue(mockedOrder);
      const result = await orderService.updateStatus(1, 'IN_PREPARATION');
      expect(result).toBeDefined();
      expect(result).toEqual(mockedOrder);
    });
  });
});
