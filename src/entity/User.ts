import {Entity, Column, CreateDateColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {BaseEntity, TimeStampEntity} from "../core/entity";

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
  
  @OneToMany(() => Follow,follow => follow.userFrom)
  following: Follow[];
  
  @OneToMany(() => Follow, follow => follow.userTo)
  followed: Follow[];
}


@Entity()
export class Follow extends TimeStampEntity{
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