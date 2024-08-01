import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
const API_KEY = '3123123';
const API_KEY_PROD = 'prod3123123';

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],

      useFactory: (configService: ConfigType<typeof config>) => {
        const { database, host, password, port, user } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database, host, password, port, user } = configService.postgres;
        const client = new Client({
          user,
          host,
          database,
          password,
          port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
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
  exports: ['API_KEY', 'DATA', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
