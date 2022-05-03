import * as bcrypt from 'bcrypt';
import {BeforeInsert, Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {AbstractEntity, TimeStampEntity} from "../core/entity";
import {PostComment, UserPostLike} from "./Post";

@Entity()
export class User extends AbstractEntity {
  @Column()
  @Index({ unique: true })
  username: string;
  
  @Column({ select: false })
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
  
  @BeforeInsert()
  async encryptPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}


@Entity()
export class Follow extends TimeStampEntity {
  @ManyToOne(() => User, user => user.following)
  userFrom: User;
  
  @ManyToOne(() => User, user => user.followed)
  userTo: User;
  
  @Column({default: false})
  isRemoved: boolean;
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