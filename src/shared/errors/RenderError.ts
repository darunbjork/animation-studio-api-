import { DomainError } from "./DomainError";

export class RenderError extends DomainError {
  statusCode = 502;
  code = "RENDER_FAILURE";
}
