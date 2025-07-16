import {
  EmailInfo,
  MailboxResponse,
  CreateEmailResponse,
  DeleteEmailResponse,
  DeleteMessagesResponse,
  CreateEmailOptions,
  GetMessagesOptions,
} from "../types";

/**
 * Interface para operações de gerenciamento de emails
 */
export interface MailsService {
  /**
   * Lista todos os emails do usuário
   * @returns Promise com array de informações dos emails
   */
  list(): Promise<EmailInfo[]>;

  /**
   * Cria um novo email
   * @param options Opções para criação do email
   * @returns Promise com o email criado
   */
  create(options?: CreateEmailOptions): Promise<CreateEmailResponse>;

  /**
   * Deleta um email específico
   * @param email Email a ser deletado
   * @returns Promise com confirmação da deleção
   */
  delete(email: string): Promise<DeleteEmailResponse>;

  /**
   * Obtém mensagens de um email específico
   * @param options Opções com o email para consulta
   * @returns Promise com as mensagens do email
   */
  getMessages(options: GetMessagesOptions): Promise<MailboxResponse>;

  /**
   * Deleta todas as mensagens de um email
   * @param email Email cujas mensagens serão deletadas
   * @returns Promise com confirmação da deleção
   */
  deleteMessages(email: string): Promise<DeleteMessagesResponse>;
}
