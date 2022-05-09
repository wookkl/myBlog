import {FollowController, UserController} from "./controller/account/UserController";
import {BlogController} from "./controller/blog/BlogController";

export const Routes = [{
  method: "post",
  route: "/user/follow",
  controller: FollowController,
  action: "followOrUnfollow"
}, {
  method: "post",
  route: "/user/signup",
  controller: UserController,
  action: "signUp"
}, {
  method: "post",
  route: "/user/login",
  controller: UserController,
  action: "login"
}, {
  method: "get",
  route: "/user/me",
  controller: UserController,
  action: "me"
}, {
  method: "get",
  route: "/user/:id",
  controller: UserController,
  action: "other"
}, {
  method: "get",
  route: "/blog/mine",
  controller: BlogController,
  action: "mine"
}, {
  method: "get",
  route: "/blog/:id",
  controller: BlogController,
  action: "other"
}]
