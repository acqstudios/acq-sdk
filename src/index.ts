// Cliente principal
export { AcqClient } from "./client";

// Cliente socket
export { AcqSocketClient } from "./socket";

// Tipos e interfaces
export type {
  AcqClientConfig,
  AcqSocketConfig,
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
export type { AcqSocket } from "./services/socket.interface";

// Eventos de socket
export { SocketEvents, SocketEventFlags } from "./services/socket.interface";
