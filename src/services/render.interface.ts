import { RenderOptions } from "../types";

/**
 * Interface para operações de renderização
 */
export interface RenderService {
  /**
   * Renderiza HTML em uma imagem PNG
   * @param options Opções com o HTML para renderizar
   * @returns Promise com o buffer da imagem
   */
  htmlToImage(options: RenderOptions): Promise<Buffer>;
}
