import { Injectable, Inject } from '@nestjs/common';
import { IOrder } from 'src/application/interfaces/order.repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrder,
  ) {}

  async create(data: Order.Data): Promise<Order.Data> {
    return this.orderRepository.create(data);
  }

  async findManyToQueue(): Promise<Order.Data[]> {
    return this.orderRepository.findManyToQueue();
  }

  async findById(id: number): Promise<Order.Data> {
    return this.orderRepository.findById(id);
  }

  async updateStatus(id: number, status: Order.Steps) {
    return this.orderRepository.updateStatus(id, status);
  }
}
