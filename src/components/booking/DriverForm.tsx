import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useCallback, useRef } from "react";

type DriverData = {
  nome: string; cognome: string; dataNascita: string; luogoNascita: string;
  viaResidenza: string; cittaResidenza: string; email: string; telefono: string;
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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      if (f) onFile(f);
    },
    [onFile]
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
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
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

const DriverForm = ({ data, onChange, title = "Dati del conducente" }: Props) => {
  const update = (field: keyof DriverData, value: string | File | null) => {
    onChange({ ...data, [field]: value });
  };

  const fields: { key: keyof DriverData; label: string; type: string; placeholder: string }[] = [
    { key: "nome", label: "Nome", type: "text", placeholder: "Mario" },
    { key: "cognome", label: "Cognome", type: "text", placeholder: "Rossi" },
    { key: "dataNascita", label: "Data di nascita", type: "date", placeholder: "" },
    { key: "luogoNascita", label: "Luogo di nascita", type: "text", placeholder: "Olbia" },
    { key: "viaResidenza", label: "Via di residenza", type: "text", placeholder: "Via Roma 1" },
    { key: "cittaResidenza", label: "Città di residenza", type: "text", placeholder: "Olbia" },
    { key: "email", label: "E-mail", type: "email", placeholder: "mario@email.com" },
    { key: "telefono", label: "Telefono", type: "tel", placeholder: "+39 333 1234567" },
    { key: "codiceFiscale", label: "Codice Fiscale", type: "text", placeholder: "RSSMRA85M01F979X" },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8">Compila tutti i campi obbligatori.</p>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={f.key} className="text-sm font-medium text-foreground">
                {f.label} <span className="text-destructive">*</span>
              </Label>
              <Input
                id={f.key}
                type={f.type}
                placeholder={f.placeholder}
                value={data[f.key] as string}
                onChange={(e) => update(f.key, e.target.value)}
                className="bg-background"
              />
            </div>
          ))}
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
