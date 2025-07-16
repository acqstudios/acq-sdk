import { ApiError } from "./types";

/**
 * Erro customizado para a API ACQ
 */
export class AcqApiError extends Error {
  public readonly code: string;
  public readonly details?: string;
  public readonly status?: number;

  constructor(error: ApiError, status?: number) {
    super(error.message);
    this.name = "AcqApiError";
    this.code = error.error;
    this.details = error.details;
    this.status = status;
  }
}

/**
 * Erro de validação de entrada
 */
export class AcqValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AcqValidationError";
  }
}

/**
 * Erro de configuração
 */
export class AcqConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AcqConfigError";
  }
}
