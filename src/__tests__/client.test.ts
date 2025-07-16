import { AcqClient } from "../client";
import { AcqConfigError } from "../errors";

describe("AcqClient", () => {
  const validConfig = {
    apiKey: "test-api-key",
  };

  it("should create client with valid config", () => {
    const client = new AcqClient(validConfig);
    expect(client).toBeInstanceOf(AcqClient);
    expect(client.render).toBeDefined();
    expect(client.mails).toBeDefined();
  });

  it("should throw error without API key", () => {
    expect(() => {
      new AcqClient({ apiKey: "" });
    }).toThrow(AcqConfigError);
  });

  it("should use custom base URL when provided", () => {
    const customConfig = {
      apiKey: "test-key",
      baseUrl: "https://custom.api.com",
    };

    const client = new AcqClient(customConfig);
    expect(client).toBeInstanceOf(AcqClient);
  });

  it("should use custom timeout when provided", () => {
    const customConfig = {
      apiKey: "test-key",
      timeout: 5000,
    };

    const client = new AcqClient(customConfig);
    expect(client).toBeInstanceOf(AcqClient);
  });
});
