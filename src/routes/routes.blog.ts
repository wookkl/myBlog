import {BlogController} from "../controller/blog/BlogController";
import {PostController} from "../controller/blog/PostController";

const blogRoutes = [{
  method: "get",
  route: "/blog/mine",
  controller: BlogController,
  action: "mine"
}, {
  method: "get",
  route: "/blog/:id",
  controller: BlogController,
  action: "other"
}, {
  method: "get",
  route: "/post/mine",
  controller: PostController,
  action: "getListMine"
}, {
  method: "get",
  route: "/post/other",
  controller: PostController,
  action: "getListOther"
}, {
  method: "post",
  route: "/post",
  controller: PostController,
  action: "create"
}];

export default blogRoutes