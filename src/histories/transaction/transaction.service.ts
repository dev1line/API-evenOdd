import { Injectable } from '@nestjs/common';
import { LatestBlockReposity } from 'src/models/latestBlock/latestBlock.reposity';
import { IRollDice } from 'src/models/rollDice/rollDice.interface';
import { RefferalReposity } from 'src/models/rollDice/rollDice.reposity';
import Big from 'big.js';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const LIMIT_TOP_NUMBER = 30;

@Injectable()
export class TransactionService {

  constructor(
    private readonly refferalRepo: RefferalReposity,
    private readonly latestBlockRepo: LatestBlockReposity
  ) { }

  async createTransaction(data: IRollDice) {
    // Save buyer info as refferal
    // let resultRoll = await this.refferalRepo.getByRefferalAddress(data.rollId.toString());
    // if (refferalData) {
    //   refferalData.lastRefferedAt = data.boughtAt;
    //   if (data.refferal !== ZERO_ADDRESS && !refferalData.refferals.includes(data.refferal)) {
    //     refferalData.refferals.push(data.refferal);
    //   }
    // } else {
    //   refferalData = {
    //     wallet: data.buyer,
    //     refferals: data.refferal !== ZERO_ADDRESS ? [data.refferal] : [],
    //     amount: '0',
    //     lastRefferedAt: data.boughtAt
    //   }
    // }
    await this.refferalRepo.createOrUpdate(data.rollId.toString(), data);

    // if (data.refferal === ZERO_ADDRESS) return;

    // await this._flatRefferalAmount(
    //   data.refferal,
    //   data.usdt,
    //   data.boughtAt
    // );
  }

  // private async _flatRefferalAmount(wallet: string, amount: string, lastRefferedAt: string) {
  //   const refferalData = await this.refferalRepo.getByRefferalAddress(wallet);
  //   if (!refferalData) {
  //     await this.refferalRepo.createOrUpdate(wallet, {
  //       wallet,
  //       refferals: [],
  //       amount: amount,
  //       lastRefferedAt: lastRefferedAt
  //     });

  //     return;
  //   }

  //   refferalData.amount = (new Big(refferalData.amount)).plus(amount);
  //   refferalData.lastRefferedAt = lastRefferedAt;

  //   await this.refferalRepo.createOrUpdate(wallet, refferalData);

  //   if (refferalData.refferals.length > 0) {
  //     for (let i = 0; i < refferalData.refferals.length; i++) {
  //       const refferalAddress = refferalData.refferals[i];
  //       await this._flatRefferalAmount(refferalAddress, amount, lastRefferedAt);
  //     }
  //   }
  // }

  async getRollDice(): Promise<IRollDice[]> {
    const result = await this.refferalRepo.getAll();

    const sortResult = result.sort((a: IRollDice, b: IRollDice) => {
      return (b.rollId) - (a.rollId);
    });

    if (sortResult.length > LIMIT_TOP_NUMBER) {
      return sortResult.slice(0, LIMIT_TOP_NUMBER);
    }

    return sortResult;
  }

  async getLatestBlock(): Promise<number> {
    return this.latestBlockRepo.get();
  }

  async syncLatestBlock(blockNumber: number) {
    return this.latestBlockRepo.sync(blockNumber);
  }
}
