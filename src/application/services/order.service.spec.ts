import { Order } from '@prisma/client';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let mockOrderRepository: OrderRepository;
  let order;

  beforeEach(() => {
    const mockPrismaHelper = {} as PrismaHelper;
    mockOrderRepository = new OrderRepository(mockPrismaHelper);
    orderService = new OrderService(mockOrderRepository);

    order = {
      id: 1,
      idempotent_key: '123',
      status: 'IN_PREPARATION',
      payment_id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe('findManyToQueue', () => {
    it('should return an array of orders', async () => {
      const mockedOrders: Order[] = [order];

      jest
        .spyOn(mockOrderRepository, 'findManyToQueue')
        .mockResolvedValue(mockedOrders);
      const result = await orderService.findManyToQueue();
      expect(result).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should return an order', async () => {
      jest.spyOn(mockOrderRepository, 'findById').mockResolvedValue(order);

      const result = await orderService.findById(1);
      expect(result).toBeDefined();
      expect(result).toEqual(order);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      jest.spyOn(mockOrderRepository, 'create').mockResolvedValue(order);
      const result = await orderService.create({
        idempotent_key: '123',
        status: 'IN_PREPARATION',
        payment_id: '123',
      });
      expect(result).toBeDefined();
      expect(result).toEqual(order);
    });
  });

  describe('updateStatus', () => {
    it('should update an order status', async () => {
      jest.spyOn(mockOrderRepository, 'updateStatus').mockResolvedValue(order);

      const result = await orderService.updateStatus(1, 'IN_PREPARATION');

      expect(result).toBeDefined();
      expect(result).toEqual(order);
    });
  });
});
