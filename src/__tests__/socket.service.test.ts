import { AcqSocketClient } from "../services/socket.service";
import { SocketEvents } from "../services/socket.interface";
import { AcqConfigError } from "../errors";

// Mock do socket.io-client
jest.mock("socket.io-client", () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    disconnect: jest.fn(),
    connect: jest.fn(),
  })),
}));

describe("AcqSocketClient", () => {
  const validConfig = {
    apiKey: "test-api-key",
    email: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create socket client with valid config", () => {
    const client = new AcqSocketClient(validConfig);
    expect(client).toBeInstanceOf(AcqSocketClient);
    expect(client.config).toEqual(validConfig);
  });

  it("should throw error without API key", () => {
    expect(() => {
      new AcqSocketClient({ apiKey: "", email: "test@example.com" });
    }).toThrow(AcqConfigError);
  });

  it("should throw error without email", () => {
    expect(() => {
      new AcqSocketClient({ apiKey: "test-key", email: "" });
    }).toThrow(AcqConfigError);
  });

  it("should use custom base URL when provided", () => {
    const customConfig = {
      apiKey: "test-key",
      email: "test@example.com",
      baseUrl: "wss://custom.socket.com",
    };

    const client = new AcqSocketClient(customConfig);
    expect(client.config).toEqual(customConfig);
  });

  it("should use custom timeout when provided", () => {
    const customConfig = {
      apiKey: "test-key",
      email: "test@example.com",
      timeout: 5000,
    };

    const client = new AcqSocketClient(customConfig);
    expect(client.config).toEqual(customConfig);
  });

  it("should have connect method", () => {
    const client = new AcqSocketClient(validConfig);
    expect(typeof client.connect).toBe("function");
  });

  it("should have disconnect method", () => {
    const client = new AcqSocketClient(validConfig);
    expect(typeof client.disconnect).toBe("function");
  });

  it("should have on method", () => {
    const client = new AcqSocketClient(validConfig);
    expect(typeof client.on).toBe("function");
  });

  it("should handle socket events", () => {
    const client = new AcqSocketClient(validConfig);
    const mockCallback = jest.fn();

    client.on(SocketEvents.NEW, mockCallback);
    // Teste básico para verificar se o método não quebra
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
