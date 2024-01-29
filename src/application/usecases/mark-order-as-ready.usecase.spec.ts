import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { OrderRepository } from 'src/adapters/database/repositories/order.repository';
import { OrderService } from 'src/application/services/order.service';
import { MarkOrderAsReadyUseCase } from 'src/application/usecases/mark-order-as-ready.usecase';
import { Order as PrismaOrder } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

describe('MarkOrderAsReadyUseCase', () => {
  let markOrderAsReadyUseCase: MarkOrderAsReadyUseCase;
  let mockOrderService: OrderService;
  let mockOrderRepository: OrderRepository;

  beforeEach(() => {
    const mockPrismaHelper = {} as PrismaHelper;
    mockOrderRepository = new OrderRepository(mockPrismaHelper);
    mockOrderService = new OrderService(mockOrderRepository);

    markOrderAsReadyUseCase = new MarkOrderAsReadyUseCase(mockOrderService);
  });

  describe('execute', () => {
    it('should not mark order as ready if status is Finished', () => {
      const mockOrder: Order.Data = {
        id: 23,
        order_id: 1,
        status: 'FINISHED',
        cpf: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockOrderService, 'findById').mockResolvedValue(mockOrder);

      expect(markOrderAsReadyUseCase.execute(1)).rejects.toThrowError(
        ConflictException,
      );
    });

    it('should not mark order as ready if status is already ready', () => {
      const mockOrder: Order.Data = {
        id: 23,
        order_id: 1,
        status: 'READY',
        cpf: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockOrderService, 'findById').mockResolvedValue(mockOrder);

      expect(markOrderAsReadyUseCase.execute(1)).rejects.toThrowError(
        ConflictException,
      );
    });

    it('should mark an order as ready', async () => {
      const mockOrder: Order.Data = {
        id: 23,
        order_id: 1,
        status: 'IN_PREPARATION',
        cpf: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockedOrder: PrismaOrder = {
        id: 23,
        order_id: 1,
        status: 'READY',
        cpf: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(mockOrderService, 'findById').mockResolvedValue(mockOrder);
      jest
        .spyOn(mockOrderService, 'updateStatus')
        .mockResolvedValue(mockedOrder);

      const result = await markOrderAsReadyUseCase.execute(1);

      expect(result).toEqual(mockedOrder);
    });
  });
});
