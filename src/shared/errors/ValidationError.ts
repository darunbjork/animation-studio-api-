import { DomainError } from "./DomainError";

export class ValidationError extends DomainError {
  statusCode = 400;
  code = "VALIDATION_ERROR";
}
