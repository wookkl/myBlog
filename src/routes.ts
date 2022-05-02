import {FollowController} from "./controller/UserController";

export const Routes = [{
  method: "post",
  route: "/follow",
  controller: FollowController,
  action: "followOrUnfollow"
}]