import {Repository} from "typeorm";
import {User} from "../entity/User";

export interface TokenResponse {
  token: string;
}

export class UserRepository extends Repository<User> {

}