import { Module } from '@nestjs/common';
import { HistoriesModule } from 'src/histories/histories.module';
import { Web3Config } from './web3.config';
import { Web3Event } from './web3.event';

@Module({
  imports: [
    HistoriesModule
  ],
  providers: [
    Web3Config,
    Web3Event
  ],
  exports: [
    Web3Event
  ]
})
export class Web3Module { }
