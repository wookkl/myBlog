import * as dotenv from 'dotenv';
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";

dotenv.config();

const ormconfig: MysqlConnectionOptions = {
  name: "default",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  type: "mysql",
  synchronize: false,
  port: 3306,
  logging: false,
  entities: [
    "src/entity/**/*.ts"
  ],
  migrations: [
    "src/migration/**/*.ts"
  ],
  subscribers: [
    "src/subscriber/**/*.ts"
  ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
};
export default ormconfig;