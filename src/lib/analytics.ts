declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    // gtag may not be ready before consent — fail silently
  }
}

export function trackWhatsAppClick(location: string): void {
  trackEvent("whatsapp_click", { location });
}

export function trackBookingStarted(): void {
  trackEvent("booking_started", {});
}

/**
 * Funnel step transition. step_name = "vehicle" | "dates" | "driver" |
 * "secondDriver" | "pickupDropoff" | "signature". step_index 0..5.
 * Use GA4 "Explore > Funnel" with these events to find drop-off.
 */
export function trackBookingStep(stepName: string, stepIndex: number): void {
  trackEvent("booking_step", { step_name: stepName, step_index: stepIndex });
}

type BookingCompletedParams = {
  bookingId: string;
  vehicleId?: string;
  vehicleName?: string;
  days: number;
  totalEur: number;
};

export function trackBookingCompleted(p: BookingCompletedParams): void {
  trackEvent("booking_completed", {
    transaction_id: p.bookingId,
    vehicle_id: p.vehicleId,
    vehicle_name: p.vehicleName,
    days: p.days,
    value: p.totalEur,
    currency: "EUR",
  });
}
