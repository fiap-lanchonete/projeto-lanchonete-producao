import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { IOrder } from 'src/application/interfaces/order.repository.interface';

@Injectable()
export class OrderRepository implements IOrder {
  constructor(private readonly prisma: PrismaHelper) {}

  create(): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  async findByStatus(status: Order.Steps): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
    });
  }
}
