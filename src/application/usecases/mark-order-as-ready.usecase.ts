import { ConflictException, Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';

@Injectable()
export class MarkOrderAsReadyUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(id: number) {
    const orderFound = await this.orderService.findById(id);

    if (orderFound.status === 'READY' || orderFound.status === 'FINISHED') {
      throw new ConflictException('Unable to change order state');
    }

    return await this.orderService.updateStatus(id, 'READY');
  }
}
