import { Injectable, Logger } from "@nestjs/common";
import { WebRedisService } from "src/connections/redis/web.redis.provider";
import { BaseModel } from 'src/models/base.model';
import { IRollDice } from "./rollDice.interface";

const DATABASE_NAME = 'refferals';

@Injectable()
export class RefferalReposity extends BaseModel {
  private readonly logger: Logger = new Logger(RefferalReposity.name);

  constructor(
    private readonly redisService: WebRedisService
  ) {
    super();
  }

  async createOrUpdate(key: string, data: IRollDice) {
    try {
      await this.redisService.hset(
        DATABASE_NAME,
        key,
        this.convertToJSON(data)
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getAll(): Promise<IRollDice[]> {
    try {
      const queriedData: any = await this.redisService.hgetall(DATABASE_NAME);
      if (!queriedData) return [];

      return Object.values(queriedData).map(item => this.convertToObject(item));
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  // async getByRefferalAddress(rollId: string): Promise<IRollDice> {
  //   try {
  //     const queriedData = await this.redisService.hget(DATABASE_NAME, rollId);
  //     if (!queriedData) return null;

  //     return this.convertToObject(queriedData);
  //   } catch (error) {
  //     this.logger.error(error);
  //     return null;
  //   }
  // }
}
