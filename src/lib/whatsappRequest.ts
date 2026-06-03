/**
 * WhatsApp request helper for the booking funnel.
 *
 * The booking system is no longer self-service: the user picks vehicle, dates,
 * pickup on the website, then taps a button that opens a pre-filled WhatsApp
 * chat. The owner handles availability, kasko/franchigia and delivery cost
 * personally via WhatsApp.
 *
 * Pricing rule: the message only shows the public daily rate as an indicative
 * estimate. NEVER include franchise/deposit/security amounts here.
 */
import type { Locale } from "@/i18n/utils";

/** International format WITHOUT the leading "+", per wa.me requirements. */
export const WHATSAPP_NUMBER = "393520459150";

export type WhatsAppRequestInput = {
  /** Vehicle commercial name shown in the message (e.g. "Fiat Panda Hybrid"). */
  vehicleName?: string;
  /** Pre-formatted pickup date label (locale-aware, set by the caller). */
  startLabel?: string;
  /** Pre-formatted dropoff date label. */
  endLabel?: string;
  /** Day count between start and end, used in the "X giorni" phrasing. */
  days?: number;
  /** Public daily-rate estimate (€). Omit to skip the price line entirely. */
  priceEstimate?: number;
  /** Free-form pickup summary (e.g. "Ritiro in sede" or "Consegna a Porto Cervo"). */
  pickupLabel?: string;
};

type LineBuilder = (input: WhatsAppRequestInput) => string[];

/**
 * Per-locale message templates. Each builder returns an ordered list of lines
 * which are joined with "\n". Lines that depend on an absent value are omitted
 * by returning an empty array entry that gets filtered out at the end.
 */
const TEMPLATES: Record<Locale, LineBuilder> = {
  it: ({ vehicleName, startLabel, endLabel, days, priceEstimate, pickupLabel }) => [
    "Ciao! 👋 Vorrei richiedere un veicolo:",
    "",
    vehicleName ? `🚗 ${vehicleName}` : "",
    startLabel && endLabel
      ? `📅 ${startLabel} → ${endLabel}${days ? ` (${days} giorni)` : ""}`
      : "",
    typeof priceEstimate === "number"
      ? `💰 Stima indicativa: ~€${priceEstimate} (da confermare)`
      : "",
    pickupLabel ? `📍 ${pickupLabel}` : "",
    "",
    "Potete confermarmi disponibilità, kasko/franchigia ed eventuale costo di consegna? Grazie!",
  ],
  en: ({ vehicleName, startLabel, endLabel, days, priceEstimate, pickupLabel }) => [
    "Hi! 👋 I'd like to request a vehicle:",
    "",
    vehicleName ? `🚗 ${vehicleName}` : "",
    startLabel && endLabel
      ? `📅 ${startLabel} → ${endLabel}${days ? ` (${days} days)` : ""}`
      : "",
    typeof priceEstimate === "number"
      ? `💰 Indicative estimate: ~€${priceEstimate} (to confirm)`
      : "",
    pickupLabel ? `📍 ${pickupLabel}` : "",
    "",
    "Could you confirm availability, kasko/excess coverage and any delivery cost? Thanks!",
  ],
  de: ({ vehicleName, startLabel, endLabel, days, priceEstimate, pickupLabel }) => [
    "Hallo! 👋 Ich möchte ein Fahrzeug anfragen:",
    "",
    vehicleName ? `🚗 ${vehicleName}` : "",
    startLabel && endLabel
      ? `📅 ${startLabel} → ${endLabel}${days ? ` (${days} Tage)` : ""}`
      : "",
    typeof priceEstimate === "number"
      ? `💰 Richtpreis: ~€${priceEstimate} (zu bestätigen)`
      : "",
    pickupLabel ? `📍 ${pickupLabel}` : "",
    "",
    "Könnten Sie Verfügbarkeit, Vollkasko/Selbstbeteiligung und eventuelle Lieferkosten bestätigen? Danke!",
  ],
  fr: ({ vehicleName, startLabel, endLabel, days, priceEstimate, pickupLabel }) => [
    "Bonjour ! 👋 Je voudrais demander un véhicule :",
    "",
    vehicleName ? `🚗 ${vehicleName}` : "",
    startLabel && endLabel
      ? `📅 ${startLabel} → ${endLabel}${days ? ` (${days} jours)` : ""}`
      : "",
    typeof priceEstimate === "number"
      ? `💰 Estimation indicative : ~€${priceEstimate} (à confirmer)`
      : "",
    pickupLabel ? `📍 ${pickupLabel}` : "",
    "",
    "Pouvez-vous confirmer la disponibilité, la franchise/kasko et les frais de livraison éventuels ? Merci !",
  ],
};

/**
 * Builds the pre-filled wa.me URL for the given locale + booking summary.
 * The caller is responsible for date formatting (date-fns is already available
 * in the booking flow) — this helper does not touch dates.
 */
export function buildWhatsAppRequest(
  lang: Locale,
  input: WhatsAppRequestInput,
): string {
  const builder = TEMPLATES[lang] ?? TEMPLATES.it;
  const message = builder(input)
    .filter((line) => line !== "")
    .join("\n")
    // Collapse triple+ newlines that arise when intermediate optional lines are
    // dropped (we still want the leading/trailing blank line between heading,
    // body and closing question).
    .replace(/\n{3,}/g, "\n\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
