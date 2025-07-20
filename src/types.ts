/**
 * Informações básicas de um email
 */
export interface EmailInfo {
  /** Endereço de email */
  email: string;
  /** Data de expiração do email */
  expiraEm: string;
}

/**
 * Mensagem de email recebida
 */
export interface EmailMessage {
  /** ID único da mensagem */
  id: string;
  /** Remetente */
  from: string;
  /** Destinatário */
  to: string;
  /** Assunto */
  subject: string;
  /** Corpo da mensagem em texto */
  body: string;
  /** Corpo da mensagem em HTML (opcional) */
  html_body?: string;
  /** Anexos da mensagem */
  attachments?: EmailAttachment[];
  /** Data de recebimento */
  received_at: string;
}

/**
 * Anexo de email
 */
export interface EmailAttachment {
  /** Nome do arquivo */
  filename: string;
  /** Tipo de conteúdo */
  content_type: string;
  /** Tamanho do arquivo em bytes */
  size: number;
}

/**
 * Resposta da caixa de entrada
 */
export interface MailboxResponse {
  /** Email consultado */
  email: string;
  /** Lista de mensagens */
  messages: EmailMessage[];
  /** Total de mensagens */
  total: number;
}

/**
 * Resposta de criação de email
 */
export interface CreateEmailResponse {
  /** Email criado */
  mail: string;
}

/**
 * Resposta de deleção de email
 */
export interface DeleteEmailResponse {
  /** Mensagem de confirmação */
  message: string;
  /** Email deletado */
  deleted_email: string;
}

/**
 * Resposta de deleção de mensagens
 */
export interface DeleteMessagesResponse {
  /** Mensagem de confirmação */
  message: string;
  /** Email cujas mensagens foram deletadas */
  email: string;
  /** Quantidade de mensagens deletadas */
  deleted_count: number;
}

/**
 * Erro da API
 */
export interface ApiError {
  /** Código do erro */
  error: string;
  /** Mensagem do erro */
  message: string;
  /** Detalhes adicionais */
  details?: string;
}

/**
 * Opções para renderização de HTML
 */
export interface RenderOptions {
  /** Código HTML para renderizar */
  html: string;
}

/**
 * Opções para criação de email
 */
export interface CreateEmailOptions {
  /** Domínio para o email (opcional) */
  domain?: string;
}

/**
 * Opções de configuração do cliente
 */
export interface AcqClientConfig {
  /** Token de autorização */
  apiKey: string;
  /** URL base da API (opcional) */
  baseUrl?: string;
  /** Timeout das requisições em ms (padrão: 30000) */
  timeout?: number;
}

/**
 * Opções para consulta de mensagens
 */
export interface GetMessagesOptions {
  /** Email para consultar mensagens */
  mail: string;
}

/**
 * Configuração do cliente de socket
 */
export interface AcqSocketConfig {
  /** Token de autorização */
  apiKey: string;
  /** E-mail */
  email: string | Array<string> | undefined;
  /** URL base do socket (opcional) */
  baseUrl?: string;
  /** Timeout das requisições em ms (padrão: 30000) */
  timeout?: number;
}
