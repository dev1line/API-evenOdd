

import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { rollDiceMap } from 'src/models/rollDice/rollDice.map';
import { TransactionService } from 'src/histories/transaction/transaction.service';
import { EthersConfig } from './ethers.config';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class EthersEvent implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(EthersEvent.name);
  private wsProvider;
  private contract;

  constructor(
    private readonly ethersConfig: EthersConfig,
    private readonly config: ConfigService,
    private readonly transactionService: TransactionService
  ) { }

  async onApplicationBootstrap() {
    const { wsProvider, contract } = await this.ethersConfig.init();
    this.wsProvider = wsProvider;
    this.contract = contract;

    await this.crawlEvents()
  }

  async crawlEvents() {
    try {
      const onChainLatestBlock = await this.wsProvider.getBlockNumber();
      // console.log('BBBBBBB', onChainLatestBlock)
      if (!onChainLatestBlock) {
        this.logger.error("Failed to get latest block number");
        return;
      }
      let crawlLatestBlock = 10236098;
      let toBlock = 10265594;

  const filter = this.contract.filters.DiceRolled();
  const events = await this.contract.queryFilter(filter,crawlLatestBlock,toBlock);
          if (events && events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            const event = events[i];

            if (Object.keys(event).length === 0) continue;

            if (event.event !== 'DiceRolled') continue;

            // console.log(`event ${i}: `, event)
            const transactionDto = rollDiceMap.createDTO(
              this.wsProvider.utils,
              event
            );
              console.log("transactionDto", transactionDto)
            if (transactionDto) {
              await this.transactionService.createTransaction(transactionDto);
            }
          }
        }
        // const bn = ethers.BigNumber.from({
        //   "type": "BigNumber",
        //   "hex": "0x03"
        // });
        // console.log("convert", parseInt(bn.toString()));
        await this.transactionService.syncLatestBlock(onChainLatestBlock);
  // const logs = await this.wsProvider.getLogs(filter);
    } catch (error) {
        this.logger.error(error);
    }
  }
}
