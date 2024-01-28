import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Post('in_preparation')
  @ApiOperation({
    summary: 'Receive the order and mark it as in preparation state',
  })
  async markAsInPreparation(@Body() data) {
    return await this.markOrderAsInPreparationUseCase.execute(data);
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
