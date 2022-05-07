import {EntityRepository, Repository} from "typeorm";
import {Blog} from "../../entity/blog/Blog";
import {DeepPartial} from "typeorm/common/DeepPartial";

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
  async getOrCreate(entityLike: DeepPartial<Blog>, defaultData?: DeepPartial<Blog>) {
    let blog = await super.findOne({
      relations: ["user"],
      where: entityLike,
    });
    if (blog === undefined) {
      const createData = {
        ...entityLike,
        ...defaultData
      }
      blog = await super.create(createData);
      await super.save(blog);
    }
  }
}
