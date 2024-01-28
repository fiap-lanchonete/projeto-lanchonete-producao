import { ConflictException, Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';

@Injectable()
export class MarkOrderAsInPreparationUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(data: Order.Data) {
    const orderFound = await this.orderService.findById(data.id);

    if (orderFound) {
      throw new ConflictException('Order already exists');
    }

    return await this.orderService.create({
      ...data,
      status: 'IN_PREPARATION',
    });
  }
}
