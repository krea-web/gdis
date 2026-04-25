import { z } from "zod";

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

const phoneRegex = /^(?:\+?39)?\s*[\d\s-]{8,16}$/;
const cfRegex = /^[A-Z]{6}\d{2}[A-EHLMPR-T]\d{2}[A-Z]\d{3}[A-Z]$/i;

function cfChecksum(cf: string): boolean {
  const code = cf.toUpperCase();
  if (code.length !== 16) return false;
  const oddMap: Record<string, number> = {
    "0": 1, "1": 0, "2": 5, "3": 7, "4": 9, "5": 13, "6": 15, "7": 17, "8": 19, "9": 21,
    A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21,
    K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14,
    U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23,
  };
  const evenMap: Record<string, number> = {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9,
    K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19,
    U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25,
  };
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    const ch = code[i];
    const isOddPosition = (i + 1) % 2 === 1;
    const value = isOddPosition ? oddMap[ch] : evenMap[ch];
    if (value === undefined) return false;
    sum += value;
  }
  const expectedChar = String.fromCharCode(65 + (sum % 26));
  return expectedChar === code[15];
}

export const emailSchema = z
  .string()
  .trim()
  .min(1, "L'email è obbligatoria")
  .email("Inserisci un'email valida");

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Il numero di telefono è obbligatorio")
  .regex(phoneRegex, "Inserisci un numero di telefono valido");

export const codiceFiscaleSchema = z
  .string()
  .trim()
  .transform((v) => v.toUpperCase())
  .refine((v) => v === "" || cfRegex.test(v), "Formato codice fiscale non valido")
  .refine((v) => v === "" || cfChecksum(v), "Codice fiscale non valido (checksum)");

export const fileSchema = z
  .instanceof(File)
  .refine(
    (f) => f.size <= MAX_FILE_SIZE_BYTES,
    `Il file supera la dimensione massima di ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`,
  )
  .refine(
    (f) => (ALLOWED_FILE_TYPES as readonly string[]).includes(f.type),
    "Formato file non supportato (usa JPG, PNG, WebP o PDF)",
  );

export const driverSchema = z.object({
  email: emailSchema,
  telefono: phoneSchema,
  codiceFiscale: codiceFiscaleSchema.optional().or(z.literal("")),
  patenteFronte: fileSchema.nullable(),
  patenteRetro: fileSchema.nullable(),
});

export const secondDriverSchema = driverSchema.extend({
  enabled: z.boolean(),
});

export const pickupDropoffSchema = z
  .object({
    pickupLocation: z.enum(["sede", "custom"]),
    pickupCustomAddress: z.string().trim(),
    pickupTime: z.string().min(1, "Seleziona un orario di ritiro"),
    dropoffTime: z.string().min(1, "Seleziona un orario di riconsegna"),
  })
  .refine(
    (d) => d.pickupLocation === "sede" || d.pickupCustomAddress.length > 0,
    { message: "Inserisci l'indirizzo di ritiro", path: ["pickupCustomAddress"] },
  );

export const dateRangeSchema = z
  .object({
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((d) => d.endDate > d.startDate, {
    message: "La data di riconsegna deve essere successiva a quella di ritiro",
    path: ["endDate"],
  });

export function validateFile(file: File): { ok: true } | { ok: false; error: string } {
  const parsed = fileSchema.safeParse(file);
  if (parsed.success) return { ok: true };
  return { ok: false, error: parsed.error.issues[0]?.message ?? "File non valido" };
}
