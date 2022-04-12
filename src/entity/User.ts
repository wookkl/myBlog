import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default: false})
    isWithdrawal: boolean;
    
    @CreateDateColumn()
    dateJoined: Date
}
