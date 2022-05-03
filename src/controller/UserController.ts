import {getCustomRepository} from "typeorm";
import {FollowRepository, UserRepository} from "../repository/UserRepository";
import {NextFunction, Request, Response} from "express";
import {CustomRequest} from "../middleware";


export class UserController {
  constructor() {
  }
  
  private repository: UserRepository = getCustomRepository(UserRepository);
  
  async signUp(request: Request, response: Response, next: NextFunction) {
    const data = this.repository.signUp(request.body);
    await this.repository.save(data.user);
    delete data.user.password;
    response.status(201).json(data);
  }
  
  async login(request: Request, response: Response, next: NextFunction) {
    const data = await this.repository.login(request.body);
    response.status(200).json(data);
  }
}

export class FollowController {
  constructor() {
  }
  
  private repository: FollowRepository = getCustomRepository(FollowRepository);
  
  followOrUnfollow(request: CustomRequest, response: Response, next: NextFunction) {
    return this.repository.createOrUpdate(request.user.id, request.body.userToId);
  }
}