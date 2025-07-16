import { HttpClient } from "../http/client";
import { RenderService } from "./render.interface";
import { RenderOptions } from "../types";
import { AcqValidationError } from "../errors";

/**
 * Implementação do serviço de renderização
 */
export class RenderServiceImpl implements RenderService {
  constructor(private readonly httpClient: HttpClient) {}

  async htmlToImage(options: RenderOptions): Promise<Buffer> {
    if (!options.html || options.html.trim().length === 0) {
      throw new AcqValidationError("HTML é obrigatório e não pode estar vazio");
    }

    return this.httpClient.postBuffer("/render", {
      html: options.html,
    });
  }
}
