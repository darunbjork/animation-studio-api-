import { DomainError } from './DomainError';

export class NotFoundError extends DomainError {
  statusCode = 404;
  code = 'NOT_FOUND_ERROR';

  constructor(message: string) {
    super(message);
  }
}
