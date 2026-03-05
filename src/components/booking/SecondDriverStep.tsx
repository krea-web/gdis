import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DriverForm from "@/components/booking/DriverForm";

type SecondDriverData = {
  enabled: boolean;
  nome: string; cognome: string; dataNascita: string; luogoNascita: string;
  viaResidenza: string; cittaResidenza: string; email: string; telefono: string;
  codiceFiscale: string; patenteFronte: File | null; patenteRetro: File | null;
};

type Props = {
  data: SecondDriverData;
  onChange: (data: SecondDriverData) => void;
};

const SecondDriverStep = ({ data, onChange }: Props) => {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Secondo Guidatore
      </h2>
      <p className="text-muted-foreground mb-8">Opzionale: aggiungi un secondo conducente.</p>

      <div className="flex items-center gap-3 mb-8 p-5 bg-card rounded-2xl border border-border">
        <Switch
          id="second-driver"
          checked={data.enabled}
          onCheckedChange={(checked) => onChange({ ...data, enabled: checked })}
        />
        <Label htmlFor="second-driver" className="font-display font-medium text-foreground cursor-pointer">
          Aggiungi Secondo Guidatore
        </Label>
      </div>

      <AnimatePresence>
        {data.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <DriverForm
              title="Dati secondo guidatore"
              data={{
                nome: data.nome,
                cognome: data.cognome,
                dataNascita: data.dataNascita,
                luogoNascita: data.luogoNascita,
                viaResidenza: data.viaResidenza,
                cittaResidenza: data.cittaResidenza,
                email: data.email,
                telefono: data.telefono,
                codiceFiscale: data.codiceFiscale,
                patenteFronte: data.patenteFronte,
                patenteRetro: data.patenteRetro,
              }}
              onChange={(driver) => onChange({ ...data, ...driver })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecondDriverStep;
