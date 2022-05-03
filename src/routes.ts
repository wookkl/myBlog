import {FollowController, UserController} from "./controller/UserController";

export const Routes = [{
  method: "post",
  route: "/follow",
  controller: FollowController,
  action: "followOrUnfollow"
}, {
  method: "post",
  route: "/signup",
  controller: UserController,
  action: "signUp"
}, {
  method: "post",
  route: "/login",
  controller: UserController,
  action: "login"
}]