import { Order } from '@prisma/client';

export interface IOrder {
  findManyToQueue(): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  create(pedido: Partial<Order>): Promise<Order>;
  updateStatus(id: number, status: string): Promise<Order>;
}
