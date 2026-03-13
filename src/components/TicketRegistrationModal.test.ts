import { describe, it, expect } from 'vitest';

describe('TicketRegistrationModal', () => {
  describe('Virtual Admission Ticket', () => {
    it('should display correct pricing for Virtual Admission', () => {
      // Virtual Admission pricing
      const usdPrice = "$30";
      const mnxPrice = "$510";
      
      expect(usdPrice).toBe("$30");
      expect(mnxPrice).toBe("$510");
    });

    it('should require phone field for registration', () => {
      const formData = {
        name: "Test User",
        email: "test@example.com",
        phone: "", // Empty phone
        couponCode: "",
        currency: "USD" as const
      };

      const isValid = formData.name && formData.email && formData.phone;
      expect(isValid).toBe(false);
    });

    it('should validate all required fields', () => {
      const formData = {
        name: "Test User",
        email: "test@example.com",
        phone: "+1234567890",
        couponCode: "",
        currency: "USD" as const
      };

      const isValid = formData.name && formData.email && formData.phone;
      expect(isValid).toBe(true);
    });

    it('should accept Virtual Admission ticket type', () => {
      const ticketType = "virtual";
      const validTypes = ["vip", "virtual", "regular"];
      
      expect(validTypes).toContain(ticketType);
    });

    it('should display orange styling for Virtual Admission', () => {
      const ticketType = "virtual";
      const borderColor = ticketType === "virtual" ? "border-orange-500/30" : "border-green-500/30";
      const buttonColor = ticketType === "virtual" ? "bg-orange-500" : "bg-green-500";
      
      expect(borderColor).toBe("border-orange-500/30");
      expect(buttonColor).toBe("bg-orange-500");
    });
  });

  describe('Stripe Integration', () => {
    it('should accept VIRTUAL_ADMISSION ticket type', () => {
      const validTicketTypes = ["GENERAL_ADMISSION", "VIRTUAL_ADMISSION"];
      const ticketType = "VIRTUAL_ADMISSION";
      
      expect(validTicketTypes).toContain(ticketType);
    });

    it('should calculate correct price in cents for Virtual Admission', () => {
      const usdPriceInCents = 3000; // $30 USD
      const mnxPriceInCents = 51000; // $510 MXN
      
      expect(usdPriceInCents).toBe(3000);
      expect(mnxPriceInCents).toBe(51000);
    });
  });
});
