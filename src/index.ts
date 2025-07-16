// Cliente principal
export { AcqClient } from "./client";

// Tipos e interfaces
export type {
  AcqClientConfig,
  EmailInfo,
  EmailMessage,
  EmailAttachment,
  MailboxResponse,
  CreateEmailResponse,
  DeleteEmailResponse,
  DeleteMessagesResponse,
  ApiError,
  RenderOptions,
  CreateEmailOptions,
  GetMessagesOptions,
} from "./types";

// Erros
export { AcqApiError, AcqValidationError, AcqConfigError } from "./errors";

// Interfaces de serviços
export type { RenderService } from "./services/render.interface";
export type { MailsService } from "./services/mails.interface";
