
class BaseException extends Error {
}

export class InvalidTokenException extends BaseException {
    constructor() {
      super('Invalid token provided.');
  }
}