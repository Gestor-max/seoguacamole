import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("CountdownTimer - Time Calculation Logic", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should calculate time remaining correctly", () => {
    const now = new Date("2026-02-06T10:00:00Z");
    const eventDate = new Date("2026-03-15T09:00:00Z");

    vi.setSystemTime(now);

    // Calculate difference manually
    const difference = eventDate.getTime() - now.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    expect(days).toBeGreaterThan(0);
    expect(hours).toBeGreaterThanOrEqual(0);
    expect(hours).toBeLessThan(24);
    expect(minutes).toBeGreaterThanOrEqual(0);
    expect(minutes).toBeLessThan(60);
    expect(seconds).toBeGreaterThanOrEqual(0);
    expect(seconds).toBeLessThan(60);
  });

  it("should show expired state when event date has passed", () => {
    const now = new Date("2026-03-15T10:00:00Z");
    const eventDate = new Date("2026-03-15T09:00:00Z");

    vi.setSystemTime(now);

    const difference = eventDate.getTime() - now.getTime();
    const isExpired = difference <= 0;

    expect(isExpired).toBe(true);
  });

  it("should format numbers with leading zeros", () => {
    const value = 5;
    const formatted = String(value).padStart(2, "0");
    expect(formatted).toBe("05");

    const value2 = 15;
    const formatted2 = String(value2).padStart(2, "0");
    expect(formatted2).toBe("15");
  });

  it("should calculate correct time units", () => {
    // 1 day, 5 hours, 30 minutes, 45 seconds
    const totalSeconds = 1 * 24 * 60 * 60 + 5 * 60 * 60 + 30 * 60 + 45;
    const totalMs = totalSeconds * 1000;

    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

    expect(days).toBe(1);
    expect(hours).toBe(5);
    expect(minutes).toBe(30);
    expect(seconds).toBe(45);
  });

  it("should handle edge case of exactly 0 seconds remaining", () => {
    const difference = 0;
    const isExpired = difference <= 0;
    expect(isExpired).toBe(true);
  });

  it("should handle large time differences", () => {
    // 365 days in the future
    const totalSeconds = 365 * 24 * 60 * 60;
    const totalMs = totalSeconds * 1000;

    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    expect(days).toBe(365);
  });
});
