import { Module } from '@nestjs/common';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaHelper],
})
export class AppModule {}
