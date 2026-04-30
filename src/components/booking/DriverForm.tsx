import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, AlertCircle } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { emailSchema, phoneSchema, codiceFiscaleSchema, validateFile } from "@/lib/validators";

type DriverData = {
  email: string; telefono: string;
  codiceFiscale: string; patenteFronte: File | null; patenteRetro: File | null;
};

type Props = {
  data: DriverData;
  onChange: (data: DriverData) => void;
  title?: string;
};

const FileDropZone = ({
  label,
  file,
  onFile,
  onClear,
}: {
  label: string;
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (f: File) => {
      const result = validateFile(f);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      onFile(f);
    },
    [onFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          file ? "border-primary/30 bg-accent" : "border-border hover:border-primary/30 hover:bg-accent/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm text-foreground font-medium truncate max-w-[200px]">{file.name}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload size={24} />
            <span className="text-sm">Trascina o clicca per caricare</span>
          </div>
        )}
      </div>
    </div>
  );
};

type FieldErrors = {
  email?: string;
  telefono?: string;
  codiceFiscale?: string;
};

const InlineError = ({ message }: { message?: string }) =>
  message ? (
    <p className="flex items-center gap-1.5 text-xs text-destructive mt-1">
      <AlertCircle size={12} />
      {message}
    </p>
  ) : null;

const DriverForm = ({ data, onChange, title = "Dati del conducente" }: Props) => {
  const [touched, setTouched] = useState<Record<keyof FieldErrors, boolean>>({
    email: false,
    telefono: false,
    codiceFiscale: false,
  });

  const update = (field: keyof DriverData, value: string | File | null) => {
    onChange({ ...data, [field]: value });
  };

  const errors: FieldErrors = {};
  if (touched.email && data.email.length > 0) {
    const r = emailSchema.safeParse(data.email);
    if (!r.success) errors.email = r.error.issues[0]?.message;
  }
  if (touched.telefono && data.telefono.length > 0) {
    const r = phoneSchema.safeParse(data.telefono);
    if (!r.success) errors.telefono = r.error.issues[0]?.message;
  }
  if (touched.codiceFiscale && data.codiceFiscale.length > 0) {
    const r = codiceFiscaleSchema.safeParse(data.codiceFiscale);
    if (!r.success) errors.codiceFiscale = r.error.issues[0]?.message;
  }

  const inputClass = (hasError?: string) =>
    `bg-background ${hasError ? "border-destructive focus-visible:ring-destructive" : ""}`;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8">Inserisci i dati di contatto.</p>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              E-mail <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="mario@email.com"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass(errors.email)}
            />
            <InlineError message={errors.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-sm font-medium text-foreground">
              Telefono <span className="text-destructive">*</span>
            </Label>
            <Input
              id="telefono"
              type="tel"
              placeholder="+39 333 1234567"
              value={data.telefono}
              onChange={(e) => update("telefono", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, telefono: true }))}
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? "telefono-error" : undefined}
              className={inputClass(errors.telefono)}
            />
            <InlineError message={errors.telefono} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="codiceFiscale" className="text-sm font-medium text-foreground">
              Codice Fiscale <span className="text-muted-foreground text-xs">(opzionale)</span>
            </Label>
            <Input
              id="codiceFiscale"
              type="text"
              placeholder="RSSMRA85M01F979X"
              value={data.codiceFiscale}
              onChange={(e) => update("codiceFiscale", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, codiceFiscale: true }))}
              aria-invalid={!!errors.codiceFiscale}
              aria-describedby={errors.codiceFiscale ? "cf-error" : undefined}
              className={inputClass(errors.codiceFiscale)}
            />
            <InlineError message={errors.codiceFiscale} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-border">
          <FileDropZone
            label="Foto Patente Fronte"
            file={data.patenteFronte}
            onFile={(f) => update("patenteFronte", f)}
            onClear={() => update("patenteFronte", null)}
          />
          <FileDropZone
            label="Foto Patente Retro"
            file={data.patenteRetro}
            onFile={(f) => update("patenteRetro", f)}
            onClear={() => update("patenteRetro", null)}
          />
        </div>
      </div>
    </div>
  );
};

export default DriverForm;
