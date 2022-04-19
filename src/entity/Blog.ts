import {User} from "./User";
import {Column, Entity, JoinColumn, OneToMany, OneToOne} from "typeorm";
import {TimeStampEntity} from "../core/entity";
import {Post} from "./Post";

@Entity()
export class Blog extends TimeStampEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  
  @Column()
  total_visit_count: number;
  
  @Column()
  title: string;
  
  @OneToMany(() => Post, post => post.blog)
  posts: Post[];
}