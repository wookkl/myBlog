import {BlogRepository} from "../../repository/blog/BlogRepository";
import {getCustomRepository} from "typeorm";
import {CustomRequest} from "../../middleware";
import {NextFunction, Response} from "express";

export class BlogController {
  constructor() {
  }
  
  private repository = getCustomRepository(BlogRepository);
 
  async mine(request: CustomRequest, response: Response, next: NextFunction) {
    const blog = await this.repository.findOne({where:{user: {id: request.user.id}}});
    response.status(200).json(blog);
  }
  
  async other(request: CustomRequest, response: Response, next: NextFunction) {
    let blog = await this.repository.findOne(request.params.id);
    blog.totalVisitCount++;
    await this.repository.save(blog);
    response.status(200).json(blog);
  }
}