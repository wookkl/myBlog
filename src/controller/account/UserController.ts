import {getCustomRepository} from "typeorm";
import {FollowRepository, UserRepository} from "../../repository/account/UserRepository";
import {NextFunction, Request, Response} from "express";
import {CustomRequest} from "../../middleware";
import {userEmitter} from "../../emitter/account/UserEmitter";


export class UserController {
  constructor() {
  }
  private repository = getCustomRepository(UserRepository);
  private emitter = userEmitter;
  
  async signUp(request: CustomRequest, response: Response, next: NextFunction) {
    const {user, token} = this.repository.signUp(request.body);
    await this.repository.save(user);
    this.emitter.emit('createUser', user);
    
    delete user.password;
    response.status(201).json({token, user});
  }
  
  async login(request: CustomRequest, response: Response, next: NextFunction) {
    const data = await this.repository.login(request.body);
    response.status(200).json(data);
  }
  
  async me(request: CustomRequest, response: Response, next: NextFunction) {
    response.status(200).json(request.user);
  }
  
  async other(request: CustomRequest, response: Response, next: NextFunction) {
    const user = await this.repository.findOne(request.params.id);
    response.status(200).json(user);
  }
}

export class FollowController {
  constructor() {
  }
  
  private repository = getCustomRepository(FollowRepository);
  
  async followOrUnfollow(request: CustomRequest, response: Response, next: NextFunction) {
    const findData = {
      userFrom: {
        id: request.user.id
      },
      userTo: {
        id: request.body.userToId
      }
    };
    await this.repository.createOrUpdate(findData);
    response.status(200).json();
  }
}