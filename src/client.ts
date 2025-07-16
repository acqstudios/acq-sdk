import { HttpClient } from "./http/client";
import { RenderServiceImpl } from "./services/render.service";
import { MailsServiceImpl } from "./services/mails.service";
import { RenderService } from "./services/render.interface";
import { MailsService } from "./services/mails.interface";
import { AcqClientConfig } from "./types";

/**
 * Cliente principal do SDK ACQ
 */
export class AcqClient {
  private readonly httpClient: HttpClient;

  /** Serviço de renderização de HTML */
  public readonly render: RenderService;

  /** Serviço de gerenciamento de emails */
  public readonly mails: MailsService;

  /**
   * Cria uma nova instância do cliente ACQ
   * @param config Configuração do cliente
   */
  constructor(config: AcqClientConfig) {
    this.httpClient = new HttpClient(config);
    this.render = new RenderServiceImpl(this.httpClient);
    this.mails = new MailsServiceImpl(this.httpClient);
  }
}
