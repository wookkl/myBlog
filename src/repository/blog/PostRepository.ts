import {EntityRepository, Repository} from "typeorm";
import {Post} from "../../entity/blog/Post";
import {PageNumberPaginator, PaginationResponse} from "../../utils/paginator";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  private paginator = new PageNumberPaginator();
  async findByUserId(userId: number, page?: number, pageSize?: number): Promise<PaginationResponse<Post>> {
    let posts = await this.createQueryBuilder("post")
      .select(["*"])
      .where("post.user = :userId", {userId: userId})
      .orderBy('post.createdAt', 'DESC');
    return await this.paginator.paginate(posts, page, pageSize);
  }
}
