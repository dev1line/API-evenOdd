import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const {ethers} = require('ethers');
const EvenOddContract = require('../../artifacts/EvenOdd.json');
const EXPECTED_PONG_BACK = 15000
const KEEP_ALIVE_CHECK_INTERVAL = 7500
const ETHERS_SOCKET_PROVIDER_OPTIONS = {
  // timeout: 30000, // ms

  // clientConfig: {
  //   // Useful if requests are large
  //   maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
  //   maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

  //   // Useful to keep a connection alive
  //   keepalive: true,
  //   keepaliveInterval: 60000, // ms
  // },

  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 10,
    onTimeout: false,
  }
};

@Injectable()
export class EthersConfig {
  private readonly logger: Logger = new Logger(EthersConfig.name);

  constructor(
    private readonly config: ConfigService
  ) {}

  async init() {
    // const provider = new ethers.providers.JsonRpcProvider(this.config.get('RPC_URL_RINKEBY'));
    try {
        let wsProvider = new ethers.providers.WebSocketProvider(
                this.config.get('WEB3_WEBSOCKET_URL')
                // ,
                // ETHERS_SOCKET_PROVIDER_OPTIONS
            );
        let contract = new ethers.Contract(
                this.config.get('WEB3_CONTRACT_ADDRESS'), 
                EvenOddContract.abi, 
                wsProvider
            );
let latestBlock = 123454;
    //   const latestBlock = await provider.getBlockNumber();

      return { wsProvider, contract, latestBlock };
    // const provider = new ethers.providers.WebSocketProvider(this.config.get('WEB3_WEBSOCKET_URL'));
    // const latestBlock = await provider.getBlockNumber();

    //   return { provider, contract, latestBlock };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
