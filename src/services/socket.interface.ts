import { AcqSocketConfig } from "../types";

export enum SocketEvents {
  /** Evento de conexão */
  CONNECT = "connect",
  /** Evento de desconexão */
  DISCONNECT = "disconnect",
  /** Evento de email recebido */
  NEW = "new",
}

export const SocketEventFlags = {
  [SocketEvents.CONNECT]: 1 << 0,
  [SocketEvents.DISCONNECT]: 1 << 1,
  [SocketEvents.NEW]: 1 << 2,
};

export interface AcqSocket {
  /** Configuração do cliente de socket */
  config: AcqSocketConfig;
  /** Conectar ao socket */
  connect(): Promise<void>;
  /** Desconectar do socket */
  disconnect(): Promise<void>;
  /** Receber eventos do socket */
  on(event: SocketEvents, callback: (data: any) => void): void;
}
