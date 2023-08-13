import { DocumentsServiceErrorResponseCode } from './documents-service-error-response-code';

class DocumentsServiceErrorResponse extends Error {
  constructor(
    code?: DocumentsServiceErrorResponseCode,
    message?: string,
    public innerError?: Error | unknown,
  ) {
    super(message);
  }
}

export { DocumentsServiceErrorResponse };
