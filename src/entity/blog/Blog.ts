import {User} from "../account/User";
import {Column, Entity, JoinColumn, OneToMany, OneToOne} from "typeorm";
import {TimeStampEntity} from '../../core/entity';
import {Post} from "./Post";

@Entity()
export class Blog extends TimeStampEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  
  @Column({default: 0})
  total_visit_count: number;
  
  @Column()
  title: string;
}