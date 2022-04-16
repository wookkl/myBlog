import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

export abstract class TimeStampEntity extends BaseEntity{
  @CreateDateColumn()
  createdAt: Date
  
  @UpdateDateColumn()
  updatedAt: Date
}