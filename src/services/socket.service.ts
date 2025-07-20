import { io, Socket } from "socket.io-client";
import { AcqSocketConfig } from "../types";
import { AcqSocket, SocketEvents } from "./socket.interface";
import { AcqConfigError } from "../errors";

/**
 * Cliente socket ACQ
 */
export class AcqSocketClient implements AcqSocket {
  public config: AcqSocketConfig;
  private socket: Socket;

  constructor(config: AcqSocketConfig) {
    // Validar configuração
    if (!config.apiKey || config.apiKey.trim() === "") {
      throw new AcqConfigError("API key é obrigatória");
    }

    this.config = config;
    this.socket = io(
      (this.config.baseUrl || "wss://ws.acq.lat").replace(/\/+$/, ""),
      {
        path: "/mailbox",
        transports: ["websocket"],
        auth: {
          authorization: this.config.apiKey,
        },
        query: { email: this.config.email || "" },
        timeout: this.config.timeout || 30000,
      }
    );
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.on("connect", () => {
        resolve();
      });
      this.socket.on("connect_error", err => {
        reject(err);
      });
    });
  }

  public async disconnect(): Promise<void> {
    return new Promise(resolve => {
      this.socket.on("disconnect", () => {
        resolve();
      });
      this.socket.disconnect();
    });
  }

  public on(event: SocketEvents, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }
}
