import { Module } from '@nestjs/common';
import { ConnectionsModule } from './connections/connections.module';
import { HistoriesModule } from './histories/histories.module';
import { Web3Module } from './web3/web3.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { SchedulesModule } from './schedules/schedules.module';
import { EthersModule } from './ethers/ethers.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    ConnectionsModule,
    // Web3Module,
    HistoriesModule,
    EthersModule,
    SchedulesModule
  ],
  providers: [
    ConnectionsModule,
    HistoriesModule
  ]
})
export class AppModule {}
