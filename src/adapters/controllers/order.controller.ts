import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetQueueOrderUseCase } from 'src/application/usecases/get-queue.usecase';

@ApiTags('Order')
@Controller('v1/order')
export class OrderController {
  constructor(private readonly getQueueOrderUseCase: GetQueueOrderUseCase) {}

  @Get('queue')
  @ApiOperation({ summary: 'Get a queue of orders' })
  async queueOfOrders() {
    return await this.getQueueOrderUseCase.execute();
  }
}
