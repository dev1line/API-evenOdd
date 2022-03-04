import { Module } from '@nestjs/common';
import { HistoriesController } from './histories.controller';
import { TransactionServiceModule } from './transaction/transaction.module';

@Module({
  imports: [
    TransactionServiceModule
  ],
  exports: [
    TransactionServiceModule
  ],
  controllers:[HistoriesController]
})
export class HistoriesModule {}

