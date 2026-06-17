import { ERROR_CODES, ERROR_MESSAGES_FA, type ErrorCode } from './codes';

/** Typed application error carrying a stable code and a user-facing Persian message. */
export class AppError extends Error {
  readonly code: ErrorCode;
  readonly userMessage: string;
  readonly cause?: unknown;
  readonly fields?: Record<string, string>;

  constructor(
    code: ErrorCode,
    options?: { cause?: unknown; userMessage?: string; fields?: Record<string, string> },
  ) {
    const userMessage = options?.userMessage ?? ERROR_MESSAGES_FA[code];
    super(`${ERROR_CODES[code]}: ${userMessage}`);
    this.name = 'AppError';
    this.code = code;
    this.userMessage = userMessage;
    this.cause = options?.cause;
    this.fields = options?.fields;
  }
}

export function toAppError(err: unknown): AppError {
  if (err instanceof AppError) return err;
  return new AppError('UNKNOWN', { cause: err });
}
