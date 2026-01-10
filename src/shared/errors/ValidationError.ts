import { DomainError } from "./DomainError";

export class ValidationError extends DomainError {
  statusCode = 400;
  code = "VALIDATION_ERROR";
  details?: Record<string, any>;

  constructor(message: string, details?: Record<string, any>) {
    super(message);
    this.details = details;
  }
}
