import {EntityRepository, Repository} from "typeorm";
import {Follow, User} from "../../entity/account/User";
import {DeepPartial} from "typeorm/common/DeepPartial";
import {TokenAuthMiddleware} from "../../middleware";
import * as bcrypt from "bcrypt";

export interface UserCreateResponse {
  user: User;
  token: string;
}

export interface TokenResponse {
  token: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  signUp(entityLike: DeepPartial<User>): UserCreateResponse {
    const user = super.create(entityLike);
    const token = (new TokenAuthMiddleware()).encode(user);
    return {user, token}
  }
  
  async login(credential: { username: string, password: string }): Promise<TokenResponse> {
    const user = await super.createQueryBuilder("user")
      .select(["user.id", "user.username",  "user.password"])
      .where("user.username = :username", { username: credential.username })
      .getOne();
    if (user === undefined) {
      throw new Error('Can not find user.')
    }
    const isMatch = await bcrypt.compare(credential.password, user.password);
    if (!isMatch) {
      throw new Error('Password does not match.')
    }
    const token = (new TokenAuthMiddleware()).encode(user);
    return {token}
  }
}

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
  async createOrUpdate(entityLike: DeepPartial<Follow>) {
    let follow = await super.findOne({
      relations: ["userFrom", "userTo"],
      where: entityLike
    });
    if (follow === undefined) {
      follow = await super.create(entityLike);
    } else {
      follow.isRemoved = !follow.isRemoved;
    }
    await super.save(follow);
  }
}