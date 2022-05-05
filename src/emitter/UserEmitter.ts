import * as events from "events";
import {User} from "../entity/User";
import {getCustomRepository} from "typeorm";
import {BlogRepository} from "../repository/BlogRepository";

export const userEmitter = new events.EventEmitter();

async function createDefault(user: User) {
  const blogRepository = getCustomRepository(BlogRepository);
  await blogRepository.getOrCreate({user: {id: user.id}}, {
    title: `${user.username}'s Blog`
  });
}

userEmitter.on('createUser', createDefault);