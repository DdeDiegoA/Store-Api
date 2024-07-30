import { Client } from 'pg';

import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
const API_KEY = '3123123';
const API_KEY_PROD = 'prod3123123';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect();

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
    {
      provide: 'DATA',
      useFactory: async (http: HttpService) => {
        const tasks = await http.axiosRef.get(
          'https://jsonplaceholder.typicode.com/todos',
        );
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
  exports: ['API_KEY', 'DATA', 'PG'],
})
export class DatabaseModule {}
