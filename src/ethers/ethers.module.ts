import { Module } from '@nestjs/common';
import { HistoriesModule } from 'src/histories/histories.module';
import { EthersConfig } from './ethers.config';
import { EthersEvent } from './ethers.event';

@Module({
  imports: [
    HistoriesModule
  ],
  providers: [
    EthersConfig,
    EthersEvent
  ],
  exports: [
    EthersEvent
  ]
})
export class EthersModule { }
