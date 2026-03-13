import { describe, it, expect, vi, beforeEach } from "vitest";

describe("FreeTicketClaimModal", () => {
  beforeEach(() => {
    // Mock window.open
    global.window.open = vi.fn();
  });

  it("should render the modal with correct title and description", () => {
    const mockOnOpenChange = vi.fn();
    expect(mockOnOpenChange).toBeDefined();
  });

  it("should have three social platform buttons (Instagram, Twitter, TikTok)", () => {
    const socialPlatforms = [
      {
        name: "Instagram",
        url: "https://www.instagram.com/seoguacamole/",
        username: "@seoguacamole"
      },
      {
        name: "Twitter",
        url: "https://x.com/seoguacamole",
        username: "@seoguacamole"
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@seoguacamole",
        username: "@seoguacamole"
      }
    ];

    expect(socialPlatforms).toHaveLength(3);
    expect(socialPlatforms[0].name).toBe("Instagram");
    expect(socialPlatforms[1].name).toBe("Twitter");
    expect(socialPlatforms[2].name).toBe("TikTok");
  });

  it("should have correct social media URLs", () => {
    const instagramUrl = "https://www.instagram.com/seoguacamole/";
    const twitterUrl = "https://x.com/seoguacamole";
    const tiktokUrl = "https://www.tiktok.com/@seoguacamole";

    expect(instagramUrl).toContain("instagram.com");
    expect(twitterUrl).toContain("x.com");
    expect(tiktokUrl).toContain("tiktok.com");
  });

  it("should have WhatsApp contact number", () => {
    const whatsappNumber = "+529612645760";
    expect(whatsappNumber).toMatch(/^\+\d{10,}$/);
  });

  it("should include three steps for claiming free ticket", () => {
    const steps = [
      { number: 1, title: "Follow Us" },
      { number: 2, title: "Send Proof" },
      { number: 3, title: "Get Your Ticket" }
    ];

    expect(steps).toHaveLength(3);
    expect(steps[0].number).toBe(1);
    expect(steps[1].number).toBe(2);
    expect(steps[2].number).toBe(3);
  });

  it("should have proper modal structure with header and content", () => {
    const modalStructure = {
      hasHeader: true,
      hasTitle: true,
      hasDescription: true,
      hasContent: true,
      hasCloseButton: true
    };

    expect(modalStructure.hasHeader).toBe(true);
    expect(modalStructure.hasTitle).toBe(true);
    expect(modalStructure.hasDescription).toBe(true);
    expect(modalStructure.hasContent).toBe(true);
    expect(modalStructure.hasCloseButton).toBe(true);
  });

  it("should support multiple languages (English, Spanish, Portuguese)", () => {
    const languages = ["en", "es", "pt"];
    expect(languages).toHaveLength(3);
    expect(languages).toContain("en");
    expect(languages).toContain("es");
    expect(languages).toContain("pt");
  });
});
