import { MailsServiceImpl } from "../services/mails.service";
import { HttpClient } from "../http/client";
import { AcqValidationError } from "../errors";
import { EmailInfo, CreateEmailResponse } from "../types";

// Mock do HttpClient
jest.mock("../http/client");
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe("MailsService", () => {
  let mailsService: MailsServiceImpl;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = new MockedHttpClient({
      apiKey: "test-key",
    }) as jest.Mocked<HttpClient>;
    mailsService = new MailsServiceImpl(mockHttpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("list", () => {
    it("should list emails successfully", async () => {
      const mockEmails: EmailInfo[] = [
        { email: "test@acq.lat", expiraEm: "2025-07-16T23:37:29.111Z" },
      ];
      mockHttpClient.get.mockResolvedValue(mockEmails);

      const result = await mailsService.list();

      expect(result).toBe(mockEmails);
      expect(mockHttpClient.get).toHaveBeenCalledWith("/mails");
    });
  });

  describe("create", () => {
    it("should create email without domain", async () => {
      const mockResponse: CreateEmailResponse = { mail: "new@acq.lat" };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await mailsService.create();

      expect(result).toBe(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith("/mail", undefined);
    });

    it("should create email with custom domain", async () => {
      const mockResponse: CreateEmailResponse = { mail: "new@custom.lat" };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await mailsService.create({ domain: "custom.lat" });

      expect(result).toBe(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith("/mail", {
        domain: "custom.lat",
      });
    });
  });

  describe("delete", () => {
    it("should delete email successfully", async () => {
      const mockResponse = {
        message: "Success",
        deleted_email: "test@acq.lat",
      };
      mockHttpClient.delete.mockResolvedValue(mockResponse);

      const result = await mailsService.delete("test@acq.lat");

      expect(result).toBe(mockResponse);
      expect(mockHttpClient.delete).toHaveBeenCalledWith("/mail", {
        mail: "test@acq.lat",
      });
    });

    it("should throw validation error for invalid email", async () => {
      await expect(mailsService.delete("invalid-email")).rejects.toThrow(
        AcqValidationError
      );

      await expect(mailsService.delete("")).rejects.toThrow(AcqValidationError);
    });
  });

  describe("getMessages", () => {
    it("should get messages successfully", async () => {
      const mockResponse = {
        email: "test@acq.lat",
        messages: [],
        total: 0,
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await mailsService.getMessages({ mail: "test@acq.lat" });

      expect(result).toBe(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith("/mailbox", {
        mail: "test@acq.lat",
      });
    });

    it("should throw validation error for invalid email", async () => {
      await expect(
        mailsService.getMessages({ mail: "invalid-email" })
      ).rejects.toThrow(AcqValidationError);
    });
  });

  describe("deleteMessages", () => {
    it("should delete messages successfully", async () => {
      const mockResponse = {
        message: "Success",
        email: "test@acq.lat",
        deleted_count: 5,
      };
      mockHttpClient.delete.mockResolvedValue(mockResponse);

      const result = await mailsService.deleteMessages("test@acq.lat");

      expect(result).toBe(mockResponse);
      expect(mockHttpClient.delete).toHaveBeenCalledWith("/mailbox", {
        mail: "test@acq.lat",
      });
    });

    it("should throw validation error for invalid email", async () => {
      await expect(
        mailsService.deleteMessages("invalid-email")
      ).rejects.toThrow(AcqValidationError);
    });
  });
});
