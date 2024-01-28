import { Injectable, Inject } from '@nestjs/common';
import { IOrder } from 'src/application/interfaces/order.repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrder,
  ) {}

  async findByStatus(status: string): Promise<Order.Data[]> {
    return this.orderRepository.findByStatus(status);
  }
}
