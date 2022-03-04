import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { rollDiceMap } from 'src/models/rollDice/rollDice.map';
import { TransactionService } from 'src/histories/transaction/transaction.service';
import { Web3Config } from './web3.config';

@Injectable()
export class Web3Event implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(Web3Event.name);
  private web3;
  private contract;

  constructor(
    private readonly wed3Config: Web3Config,
    private readonly transactionService: TransactionService,
  ) { }

  async onApplicationBootstrap() {
    const { web3, contract } = await this.wed3Config.init();
    this.web3 = web3;
    this.contract = contract;

    await this.crawlEvents()
  }

  async crawlEvents() {
    try {
      const onChainLatestBlock = await this.web3.eth.getBlockNumber();
      console.log('AAAAAAAAAAAAAAAAA', onChainLatestBlock)
      if (!onChainLatestBlock) {
        this.logger.error("Failed to get latest block number");
        return;
      }
      let crawlLatestBlock = 10236098;
      let toBlock = 10265594;
      // let crawlLatestBlock = await this.transactionService.getLatestBlock();
      // if (crawlLatestBlock === 0) {
      //   crawlLatestBlock = onChainLatestBlock - 150;
      //   await this.transactionService.syncLatestBlock(crawlLatestBlock);
      // }

      // let toBlock;
      // if (onChainLatestBlock - 150 <= crawlLatestBlock) {
      //   toBlock = crawlLatestBlock;
      // } else {
      //   toBlock = onChainLatestBlock - 150;
      // }

      this.contract.getPastEvents('allEvents', {
        fromBlock: crawlLatestBlock,
        toBlock: toBlock
      }, (_error, _events) => { }).then(async (events) => {
        // console.log("evemtsad:", events)
        if (events && events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            const event = events[i];
          
            // if (!event || event.blockNumber <= 142715010) continue;
            if (Object.keys(event).length === 0) continue;

            if (event.event !== 'DiceRolled') continue;
            console.log(`event ${i}: `, event)
            const transactionDto = rollDiceMap.createDTO(
              this.web3.utils,
              event
            );
              console.log("transactionDto", transactionDto)
            if (transactionDto) {
              await this.transactionService.createTransaction(transactionDto);
            }
          }
        }

        await this.transactionService.syncLatestBlock(onChainLatestBlock);
      });
    } catch (error) {
        this.logger.error(error);
    }
  }

  // TODO: Events listener
  // private async setupEventListener(contractEvent: any) {
  //   try {
  //     contractEvent({ fromBlock: this.latestBlock }, (_error, _event) => { })
  //       .on('data', async (event) => {
  //         console.log(event.blockNumber);
  //         const latestBlock = await this.transactionService.getLatestBlock();

  //         if (!event || event.blockNumber <= latestBlock) return;
  //         if (Object.keys(event).length === 0) return;

  //         const transactionDto = RefferalMap.createDTO(
  //           this.web3.utils,
  //           event
  //         );

  //         if (transactionDto) {
  //           await this.transactionService.createTransaction(transactionDto);
  //         }

  //         await this.transactionService.syncLatestBlock(event.blockNumber);
  //       });
  //   } catch (error) {
  //     this.logger.error(error);
  //   }
  // }
}
