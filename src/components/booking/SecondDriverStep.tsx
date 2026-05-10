import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DriverForm from "@/components/booking/DriverForm";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

type SecondDriverData = {
  enabled: boolean;
  email: string; telefono: string;
  codiceFiscale: string; patenteFronte: File | null; patenteRetro: File | null;
};

type Props = {
  data: SecondDriverData;
  onChange: (data: SecondDriverData) => void;
  lang?: Locale;
};

const SecondDriverStep = ({ data, onChange, lang = "it" }: Props) => {
  const t = useTranslations(lang);
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        {t("booking.secondDriver.title")}
      </h2>
      <p className="text-muted-foreground mb-8">{t("booking.secondDriver.subtitle")}</p>

      <div className="flex items-center gap-3 mb-8 p-5 bg-card rounded-2xl border border-border">
        <Switch
          id="second-driver"
          checked={data.enabled}
          onCheckedChange={(checked) => onChange({ ...data, enabled: checked })}
        />
        <Label htmlFor="second-driver" className="font-display font-medium text-foreground cursor-pointer">
          {t("booking.secondDriver.toggle")}
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
              title={t("booking.driver.secondTitle")}
              lang={lang}
              data={{
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
