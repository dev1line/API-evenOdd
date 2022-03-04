import { Controller, Get } from "@nestjs/common";
import { IRollDice } from "src/models/rollDice/rollDice.interface";
import { TransactionService } from "./transaction/transaction.service";

@Controller('histories')

export class HistoriesController {
    constructor(
        private readonly transactionService: TransactionService
      ) { }
    
      @Get('allDiceRolled')
      async getRollDice(): Promise<IRollDice[]> {
        return this.transactionService.getRollDice();
      }
}