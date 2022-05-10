import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as typeORM from "typeorm";
import {NextFunction, Request, Response} from "express";
import ConnectionOptions from "../ormconfig";
import * as jwt from "jsonwebtoken";
import {User} from "./entity/account/User";
import {InvalidTokenException} from "./utils/exceptions";
import {getCustomRepository} from "typeorm";
import {UserRepository} from "./repository/account/UserRepository";


const getOrCreateConnection = async (args: MysqlConnectionOptions): Promise<void> => {
  try {
    await typeORM.createConnection(args);
  } catch (error) {
    typeORM.getConnection(args.name);
  }
}

export const dbConnectionMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  try {
    await getOrCreateConnection(ConnectionOptions);
    next();
  } catch (error) {
    response.status(500).json({message: "DB Connection failed", error: error});
  }
}

interface TokenPayload {
  userId: number;
}

export interface CustomRequest extends Request {
  user?: User;
  headers: { [props: string]: any }
}

export class TokenAuthMiddleware {
  constructor(private request?: CustomRequest) {
  }
  private userRepository = getCustomRepository(UserRepository);
  private secret = process.env.WEB_TOKEN_SECRET;
  
  encode(user: User): string {
    return jwt.sign({userId: user.id}, this.secret);
  }
  
  async decode(): Promise<void> {
    try {
      const token = this.request.headers['x-token'];
      const payload = jwt.verify(token, this.secret);
      this.request.user = await this.userRepository.findOne({id: payload.userId});
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}

export const tokenAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const authorizedPath = ['/user/signup', '/user/login', '/blog/:id', '/post/other'];
    if (!authorizedPath.includes(request.path)) {
      const tokeAuthMiddlewareInstance = new TokenAuthMiddleware(request);
      await tokeAuthMiddlewareInstance.decode();
    }
    next();
  } catch (error) {
    response.status(403).json({message: "Token must be provided", error})
  }
}