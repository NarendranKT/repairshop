import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Account } from './entity/Accounts';
import { Session } from './entity/Sessions';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
  synchronize: true, // Set to false in production
  logging: true,
  entities: [User, Account, Session],
  // migrations: ['src/migration/**/*.ts'],
  // subscribers: ['src/subscriber/**/*.ts'],
});

export default AppDataSource;
