import { DomainError } from './DomainError';

export class AuthorizationError extends DomainError {
  statusCode = 403;
  code = 'AUTHORIZATION_ERROR';
}
