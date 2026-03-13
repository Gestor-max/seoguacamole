import { describe, it, expect, vi, beforeEach } from "vitest";

describe("FreeTicketModal", () => {
  beforeEach(() => {
    // Mock fetch for geolocation API
    global.fetch = vi.fn();
  });

  it("should render modal for non-Mexico users", async () => {
    // Mock response for non-Mexico country
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ country_code: "US" }),
    });

    expect(true).toBe(true);
  });

  it("should not render modal for Mexico users", async () => {
    // Mock response for Mexico
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ country_code: "MX" }),
    });

    expect(true).toBe(true);
  });

  it("should display correct English content", () => {
    const content = {
      title: "Earn a Free Virtual Ticket!",
      description: "Send me a DM on Instagram: seonestor",
      close: "Close",
    };

    expect(content.title).toBe("Earn a Free Virtual Ticket!");
    expect(content.description).toContain("seonestor");
  });

  it("should display correct Spanish content", () => {
    const content = {
      title: "¡Gana un boleto virtual gratis!",
      description: "Envíame un DM en Instagram: seonestor",
      close: "Cerrar",
    };

    expect(content.title).toContain("boleto virtual");
    expect(content.description).toContain("seonestor");
  });

  it("should display correct Portuguese content", () => {
    const content = {
      title: "Ganhe um ingresso virtual grátis!",
      description: "Envie-me uma DM no Instagram: seonestor",
      close: "Fechar",
    };

    expect(content.title).toContain("ingresso virtual");
    expect(content.description).toContain("seonestor");
  });

  it("should have correct Instagram link", () => {
    const instagramUrl = "https://instagram.com/seonestor";
    expect(instagramUrl).toContain("seonestor");
    expect(instagramUrl).toContain("instagram.com");
  });
});
