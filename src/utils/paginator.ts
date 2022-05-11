import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";

export interface PaginationResponse<T> {
  data: T[];
  totalPage: number;
}

export class PageNumberPaginator {
  constructor() {
  }
  
  async paginate<T>(queryBuilder: SelectQueryBuilder<T>, page: number, pageSize: number): Promise<PaginationResponse<T>> {
    const [data, count] =  await queryBuilder.take(pageSize).skip(pageSize * Number(page - 1)).getManyAndCount();
    return {data, totalPage: Math.ceil(count / pageSize)};
  }
}