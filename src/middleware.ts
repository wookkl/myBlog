import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as typeORM from "typeorm";
import {NextFunction, Request, Response} from "express";
import ConnectionOptions from "../ormconfig";

const getOrCreateConnection = async (args: MysqlConnectionOptions): Promise<void> => {
  try {
    await typeORM.createConnection(args);
  } catch (error) {
    typeORM.getConnection(args.name);
  }
}

export const dbConnectionMiddleware = async (request: Request, callback: Response, next: NextFunction) => {
  try {
    await getOrCreateConnection(ConnectionOptions);
  } catch (error) {
    await callback.status(500).json({message: "DB Connection failed", error: error});
  }
}