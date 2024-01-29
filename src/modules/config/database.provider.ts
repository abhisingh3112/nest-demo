import { Sequelize } from 'sequelize-typescript';
import * as dotenv from "dotenv";
import { User } from 'src/models/user.model';
dotenv.config();

const options: any ={
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_DATABASE,
  replication: {
    read: {
        host: process.env.DB_READ_HOST,
        username: process.env.DB_READ_USERNAME,
        password: process.env.DB_READ_PASSWORD,
    },
    write: {
        host: process.env.DB_WRITE_HOST,
        username: process.env.DB_WRITE_USERNAME,
        password: process.env.DB_WRITE_PASSWORD,
    },
  },
};

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize: Sequelize = new Sequelize(options.database, null!, null!, {
        models: [User],
        ...options,
      });

      try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
      }
      return sequelize;
    },
  },
];