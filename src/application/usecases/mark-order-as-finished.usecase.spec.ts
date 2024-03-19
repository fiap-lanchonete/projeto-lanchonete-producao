import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { MarkOrderAsFinishedUseCase } from 'src/application/usecases/mark-order-as-finished.usecase';
import { Order as PrismaOrder } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

describe('MarkOrderAsFinishedUseCase', () => {
  let markOrderAsFInishedUseCase: MarkOrderAsFinishedUseCase;
  let mockOrderService: OrderService;
  let mockOrderRepository: OrderRepository;

  beforeEach(() => {
    const mockPrismaHelper = {} as PrismaHelper;
    mockOrderRepository = new OrderRepository(mockPrismaHelper);
    mockOrderService = new OrderService(mockOrderRepository);

    markOrderAsFInishedUseCase = new MarkOrderAsFinishedUseCase(
      mockOrderService,
    );
  });

  describe('execute', () => {
    it('should not mark order as finished if status of order is not ready', async () => {
      const mockOrder: PrismaOrder = {
        id: 23,
        idempotent_key: '1',
        status: 'IN_PREPARATION',
        payment_id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockOrderRepository, 'findById').mockResolvedValue(mockOrder);
      jest.spyOn(mockOrderService, 'updateStatus').mockResolvedValue(mockOrder);

      const result = markOrderAsFInishedUseCase.execute(1);

      expect(result).rejects.toThrow(ConflictException);
    });

    it('should mark order as finished', async () => {
      const mockOrder: PrismaOrder = {
        id: 23,
        idempotent_key: '1',
        status: 'READY',
        payment_id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockOrderRepository, 'findById').mockResolvedValue(mockOrder);
      jest.spyOn(mockOrderService, 'updateStatus').mockResolvedValue(mockOrder);

      const result = await markOrderAsFInishedUseCase.execute(1);

      expect(result).toBe(mockOrder);
    });
  });
});
