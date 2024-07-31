import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private clientPg: Client,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    return `apiKey: ${apiKey}`;
  }

  async getTasks(): Promise<any> {
    try {
      const res = await this.clientPg.query('SELECT * FROM tasks');
      return res.rows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
