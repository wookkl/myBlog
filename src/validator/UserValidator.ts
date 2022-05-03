import {body} from "express-validator";

export const followValidator = [
  body('userToId', 'Invalid userToId').isInt()
]

export const userValidator = [
  body('username', 'Invalid username').isString(),
  body('password', 'Invalid password').isStrongPassword()
]