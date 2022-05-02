import {body} from "express-validator";

export const followValidator = [
  body('userToId', 'Invalid userToId').isInt()
]