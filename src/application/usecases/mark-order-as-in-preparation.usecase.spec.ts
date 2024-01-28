import { ConflictException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { MarkOrderAsInPreparationUseCase } from 'src/application/usecases/mark-order-as-in-preparation.usecase';

describe('MarkOrderAsInPreparationUseCase', () => {
  let markOrderAsInPreparationUseCase: MarkOrderAsInPreparationUseCase;
  let mockOrderService: OrderService;
  let mockOrderRepository: OrderRepository;

  beforeEach(() => {
    const mockPrismaHelper = {} as PrismaHelper;
    mockOrderRepository = new OrderRepository(mockPrismaHelper);
    mockOrderService = new OrderService(mockOrderRepository);

    markOrderAsInPreparationUseCase = new MarkOrderAsInPreparationUseCase(
      mockOrderService,
    );
  });

  describe('execute', () => {
    it('should throw error if order already exists', async () => {
      const mockOrder: Order = {
        id: 23,
        order_id: 1,
        status: 'IN_PREPARATION',
        user_id: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockOrderRepository, 'findById').mockResolvedValue(mockOrder);
      jest.spyOn(mockOrderService, 'create').mockResolvedValue(mockOrder);

      const result = markOrderAsInPreparationUseCase.execute({
        id: 23,
        order_id: 1,
        status: 'IN_PREPARATION',
        user_id: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(result).rejects.toThrow(ConflictException);
    });

    it('should mark order as in preparation', async () => {
      const mockOrder: Order = {
        id: 23,
        order_id: 1,
        status: 'IN_PREPARATION',
        user_id: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockOrderRepository, 'findById').mockResolvedValue(null);
      jest.spyOn(mockOrderService, 'create').mockResolvedValue(mockOrder);

      const result = await markOrderAsInPreparationUseCase.execute({
        id: 23,
        order_id: 1,
        status: 'IN_PREPARATION',
        user_id: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(result).toEqual(mockOrder);
    });
  });
});
