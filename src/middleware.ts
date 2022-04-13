import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as typeORM from "typeorm";
import {NextFunction, Request, Response} from "express";

const getOrCreateConnection = async (args: MysqlConnectionOptions): Promise<void> => {
  try {
    await typeORM.createConnection(args);
  } catch (error) {
    typeORM.getConnection(args.name);
  }
}

export const dbConnectionMiddleware = async (request: Request, callback: Response, next: NextFunction) => {
  try {
    await getOrCreateConnection({
      name: "default",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      type: "mysql",
      synchronize: false
    })
  } catch (error) {
    await callback.status(500).json({message: "DB Connection failed", error: error});
  }
}