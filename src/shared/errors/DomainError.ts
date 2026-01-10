export abstract class DomainError extends Error {
  abstract statusCode: number;
  abstract code: string;

  constructor(message: string) {
    super(message);
  }
}
