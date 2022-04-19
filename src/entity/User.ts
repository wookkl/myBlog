import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {BaseEntity, TimeStampEntity} from "../core/entity";
import {PostComment, UserPostLike} from "./Post";

@Entity()
export class User extends BaseEntity {
  
  @Column()
  username: string;
  
  @Column()
  password: string;
  
  @Column({default: false})
  isWithdrawal: boolean;
  
  @CreateDateColumn()
  dateJoined: Date
  
  @OneToMany(() => Follow, follow => follow.userFrom)
  following: Follow[];
  
  @OneToMany(() => Follow, follow => follow.userTo)
  followed: Follow[];
  
  @OneToMany(() => UserPostLike, (postLike) => postLike.user)
  postLikes: UserPostLike[];
  
  @OneToMany(() => PostComment, (postComment) => postComment.user)
  postComments: PostComment[];
}


@Entity()
export class Follow extends TimeStampEntity {
  @ManyToOne(() => User, user => user.following)
  userFrom: User;
  
  @ManyToOne(() => User, user => user.followed)
  userTo: User;
}


@Entity()
export class SocialToken extends TimeStampEntity {
  
  @OneToOne(() => User)
  user: User;
  
  @Column()
  accessToken: string;
  
  @Column()
  refreshToken: string;
  
  @Column({type: "datetime"})
  expiredAt: string;
}