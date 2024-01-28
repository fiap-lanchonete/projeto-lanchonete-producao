import { Injectable } from '@nestjs/common';
import { Order as PrismaOrder } from '@prisma/client';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { IOrder } from 'src/application/interfaces/order.repository.interface';

@Injectable()
export class OrderRepository implements IOrder {
  constructor(private readonly prisma: PrismaHelper) {}

  async create(data: PrismaOrder): Promise<PrismaOrder> {
    return await this.prisma.order.create({
      data,
    });
  }

  async findManyToQueue(): Promise<PrismaOrder[]> {
    return await this.prisma.order.findMany({
      where: {
        OR: [{ status: 'IN_PREPARATION' }, { status: 'READY' }],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<PrismaOrder | null> {
    return await this.prisma.order.findFirst({
      where: { id },
    });
  }

  async updateStatus(id: number, status: Order.Steps): Promise<PrismaOrder> {
    return await this.prisma.order.update({
      where: { id: id },
      data: { status },
    });
  }
}
