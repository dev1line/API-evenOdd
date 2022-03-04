import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HistoriesModule } from 'src/histories/histories.module';
import { EventSchedule } from './schedule.event';
import { ConnectionsModule } from 'src/connections/connections.module';
import { ModelsModule } from 'src/models/models.module';
import { EthersModule } from 'src/ethers/ethers.module';
// import { Web3Module } from 'src/web3/web3.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HistoriesModule,
    ConnectionsModule,
    ModelsModule,
    // Web3Module
    EthersModule
  ],
  providers: [
    EventSchedule
  ],
  exports: [
    EventSchedule
  ]
})
export class SchedulesModule {}
