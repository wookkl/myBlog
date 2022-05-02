import {Repository} from "typeorm";
import {Follow, User} from "../entity/User";

export interface TokenResponse {
  token: string;
}

export class UserRepository extends Repository<User> {

}

export class FollowRepository extends Repository<Follow> {
  async createOrUpdate(userFromId: number, userToId: number) {
    const findData = {
      userFrom: {
        id: userFromId
      },
      userTo: {
        id: userToId
      }
    };
    let follow = await super.findOne({
      relations: ["userFrom", "userTo"],
      where: findData
    });
    if (follow === undefined) {
      follow = await super.create(findData);
    } else {
      follow.isRemoved = !follow.isRemoved;
    }
    await super.save(follow);
    return follow;
  }
}