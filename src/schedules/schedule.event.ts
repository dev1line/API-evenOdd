import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EthersEvent } from 'src/ethers/ethers.event';
// import { Web3Event } from 'src/web3/web3.event';

@Injectable()
export class EventSchedule {
  private readonly logger = new Logger(EventSchedule.name);

  constructor(
    // private readonly web3Event: Web3Event
    private readonly ethersEvent: EthersEvent
  ) { }

  // @Cron(CronExpression.EVERY_MINUTE)
  async crawlSaleEvents() {
    // this.web3Event.crawlEvents();
    this.ethersEvent.crawlEvents();
  }
}
