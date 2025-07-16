import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AcqClientConfig, ApiError } from "../types";
import { AcqApiError, AcqConfigError } from "../errors";

/**
 * Cliente HTTP base para comunicação com a API
 */
export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(config: AcqClientConfig) {
    if (!config.apiKey) {
      throw new AcqConfigError("API key é obrigatória");
    }

    this.client = axios.create({
      baseURL: config.baseUrl || "https://api.acq.lat",
      timeout: config.timeout || 30000,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "acq-sdk/1.0.0",
      },
    });

    // Interceptor para tratamento de erros
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.data) {
          const apiError: ApiError = error.response.data;
          throw new AcqApiError(apiError, error.response.status);
        }
        throw error;
      }
    );
  }

  /**
   * Realiza uma requisição GET
   */
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, { params });
    return response.data;
  }

  /**
   * Realiza uma requisição POST
   */
  async post<T>(url: string, data?: unknown): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data);
    return response.data;
  }

  /**
   * Realiza uma requisição POST que retorna um buffer (para imagens)
   */
  async postBuffer(url: string, data?: unknown): Promise<Buffer> {
    const response: AxiosResponse<ArrayBuffer> = await this.client.post(
      url,
      data,
      {
        responseType: "arraybuffer",
      }
    );
    return Buffer.from(response.data);
  }

  /**
   * Realiza uma requisição DELETE
   */
  async delete<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, {
      params,
    });
    return response.data;
  }
}
