import { RenderServiceImpl } from "../services/render.service";
import { HttpClient } from "../http/client";
import { AcqValidationError } from "../errors";

// Mock do HttpClient
jest.mock("../http/client");
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe("RenderService", () => {
  let renderService: RenderServiceImpl;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = new MockedHttpClient({
      apiKey: "test-key",
    }) as jest.Mocked<HttpClient>;
    renderService = new RenderServiceImpl(mockHttpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("htmlToImage", () => {
    it("should render HTML to image successfully", async () => {
      const mockBuffer = Buffer.from("fake-image-data");
      mockHttpClient.postBuffer.mockResolvedValue(mockBuffer);

      const result = await renderService.htmlToImage({
        html: "<html><body>Test</body></html>",
      });

      expect(result).toBe(mockBuffer);
      expect(mockHttpClient.postBuffer).toHaveBeenCalledWith("/render", {
        html: "<html><body>Test</body></html>",
      });
    });

    it("should throw validation error for empty HTML", async () => {
      await expect(renderService.htmlToImage({ html: "" })).rejects.toThrow(
        AcqValidationError
      );

      await expect(renderService.htmlToImage({ html: "   " })).rejects.toThrow(
        AcqValidationError
      );
    });

    it("should throw validation error for missing HTML", async () => {
      await expect(
        renderService.htmlToImage({ html: null as any })
      ).rejects.toThrow(AcqValidationError);

      await expect(
        renderService.htmlToImage({ html: undefined as any })
      ).rejects.toThrow(AcqValidationError);
    });
  });
});
