import { AppError } from './AppError';

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', statusCode: number = 403) {
    super(message, statusCode);
    this.name = 'ForbiddenError';
  }
}
