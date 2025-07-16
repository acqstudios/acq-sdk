import { HttpClient } from "../http/client";
import { MailsService } from "./mails.interface";
import {
  EmailInfo,
  MailboxResponse,
  CreateEmailResponse,
  DeleteEmailResponse,
  DeleteMessagesResponse,
  CreateEmailOptions,
  GetMessagesOptions,
} from "../types";
import { AcqValidationError } from "../errors";

/**
 * Implementação do serviço de emails
 */
export class MailsServiceImpl implements MailsService {
  constructor(private readonly httpClient: HttpClient) {}

  async list(): Promise<EmailInfo[]> {
    return this.httpClient.get<EmailInfo[]>("/mails");
  }

  async create(options?: CreateEmailOptions): Promise<CreateEmailResponse> {
    const data = options?.domain ? { domain: options.domain } : undefined;
    return this.httpClient.post<CreateEmailResponse>("/mail", data);
  }

  async delete(email: string): Promise<DeleteEmailResponse> {
    if (!email || !this.isValidEmail(email)) {
      throw new AcqValidationError("Email inválido");
    }

    return this.httpClient.delete<DeleteEmailResponse>("/mail", {
      mail: email,
    });
  }

  async getMessages(options: GetMessagesOptions): Promise<MailboxResponse> {
    if (!options.mail || !this.isValidEmail(options.mail)) {
      throw new AcqValidationError("Email inválido");
    }

    return this.httpClient.post<MailboxResponse>("/mailbox", {
      mail: options.mail,
    });
  }

  async deleteMessages(email: string): Promise<DeleteMessagesResponse> {
    if (!email || !this.isValidEmail(email)) {
      throw new AcqValidationError("Email inválido");
    }

    return this.httpClient.delete<DeleteMessagesResponse>("/mailbox", {
      mail: email,
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
