import {getCustomRepository} from "typeorm";
import {FollowRepository} from "../repository/UserRepository";
import {NextFunction, Response} from "express";
import {CustomRequest} from "../middleware";


export class FollowController {
  constructor() {
  }
  
  private repository: FollowRepository = getCustomRepository(FollowRepository);
  
  followOrUnfollow(request: CustomRequest, response: Response, next: NextFunction) {
    return this.repository.createOrUpdate(request.user.id, request.body.userToId);
  }
}