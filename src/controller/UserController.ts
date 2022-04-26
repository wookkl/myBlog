import {getCustomRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {UserRepository} from "../repository/UserRepository";


export class UserController {
    private userRepository: UserRepository = getCustomRepository(UserRepository);
}