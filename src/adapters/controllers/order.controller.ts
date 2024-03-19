import { Controller, Get, Param, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InPreparationDTO } from 'src/application/dtos/mark-in-preparation.dto';
import { GetQueueOrderUseCase } from 'src/application/usecases/get-queue.usecase';
import { MarkOrderAsFinishedUseCase } from 'src/application/usecases/mark-order-as-finished.usecase';
import { MarkOrderAsInPreparationUseCase } from 'src/application/usecases/mark-order-as-in-preparation.usecase';
import { MarkOrderAsReadyUseCase } from 'src/application/usecases/mark-order-as-ready.usecase';

@ApiTags('Order')
@Controller('v1/order')
export class OrderController {
  constructor(
    private readonly getQueueOrderUseCase: GetQueueOrderUseCase,
    private readonly markOrderAsInPreparationUseCase: MarkOrderAsInPreparationUseCase,
    private readonly markOrderAsReadyUseCase: MarkOrderAsReadyUseCase,
    private readonly markOrderAsFinishedUseCase: MarkOrderAsFinishedUseCase,
  ) {}

  @Get('queue')
  @ApiOperation({ summary: 'Get a queue of orders' })
  async queueOfOrders() {
    return await this.getQueueOrderUseCase.execute();
  }

  @MessagePattern('in_preparation')
  @ApiOperation({
    summary: 'Receive the order and mark it as in preparation state',
  })
  async markAsInPreparation(@Payload() data: InPreparationDTO) {
    const status = 'IN_PREPARATION';

    return await this.markOrderAsInPreparationUseCase.execute({
      ...data,
      status,
    });
  }

  @Put('ready')
  @ApiOperation({
    summary: 'Mark the order as ready',
  })
  async markAsReady(@Param('id') id: string) {
    return await this.markOrderAsReadyUseCase.execute(parseInt(id));
  }

  @Put('finished')
  @ApiOperation({
    summary: 'Mark the order as finished',
  })
  async markAsFinished(@Param('id') id: string) {
    return await this.markOrderAsFinishedUseCase.execute(parseInt(id));
  }
}
