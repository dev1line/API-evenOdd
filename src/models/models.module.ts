import { Module } from '@nestjs/common';
import { ConnectionsModule } from 'src/connections/connections.module';
import { LatestBlockReposity } from './latestBlock/latestBlock.reposity';
import { RefferalReposity } from './rollDice/rollDice.reposity';

@Module({
  imports: [
    ConnectionsModule
  ],
  providers: [
    RefferalReposity,
    LatestBlockReposity
  ],
  exports: [
    RefferalReposity,
    LatestBlockReposity
  ]
})
export class ModelsModule { }
