import {body} from "express-validator";


export const postValidator = [
  body('title', 'Invalid title').isString,
  body('content', 'Invalid content').isString
]