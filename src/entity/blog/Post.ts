import {User} from "../account/User";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {TimeStampEntity} from "../../core/entity";
import {Blog} from "./Blog";

@Entity()
export class Post extends TimeStampEntity {
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
  
  @Column()
  title: string;
  
  @Column()
  content: string;
  
  @Column({default: 0})
  view_count: number;
  
  @Column({default: false})
  is_removed: boolean;
  
  @Column({default: false})
  is_private: boolean;
  
  @OneToMany(() => UserPostLike, userLike => userLike.post)
  userLikes: UserPostLike[];
  
  @OneToMany(() => PostComment, comment => comment.user)
  comments: PostComment[];
}

@Entity()
export class UserPostLike extends TimeStampEntity {
  @ManyToOne(() => User, (user) => user.postLikes)
  user: User;
  
  @ManyToOne(() => Post, (post) => post.userLikes)
  post: Post;
}

@Entity()
export class PostComment  extends TimeStampEntity {
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
  
  @ManyToOne(() => User, (user) => user.postComments)
  user: User;
  
  @Column()
  content: string;
}