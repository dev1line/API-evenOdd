import { ethers } from "ethers";
import { IRollDice } from "./rollDice.interface";

export class rollDiceMap {
  static createDTO(web3Utils, event) {
    const eventValues = event.args;

    return {
      rollId: parseInt(eventValues.rollId.toString()),
      diceNumber_1: eventValues.diceNumber_1,
      diceNumber_2: eventValues.diceNumber_2,
      isEven: eventValues.isEven
    } as IRollDice;
  }
}
