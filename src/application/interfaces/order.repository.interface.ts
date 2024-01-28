import { Order } from '@prisma/client';

export interface IOrder {
  findByStatus(status: string): Promise<Order[]>;
  create(pedido: Partial<Order>): Promise<Order>;
}
