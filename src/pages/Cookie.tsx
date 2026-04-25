import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BUSINESS_EMAIL } from "@/lib/siteSchema";

const Cookie = () => {
  const breadcrumbs = [{ name: "Cookie Policy", url: "/cookie" }];
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Cookie Policy — GDIS Rent & Service"
        description="Elenco dei cookie utilizzati sul sito gdisrentservice.com, finalità, durata e modalità per gestire o revocare il consenso."
        canonical="/cookie"
        breadcrumbs={breadcrumbs}
      />
      <Breadcrumbs items={breadcrumbs} />
      <article className="container py-8 md:py-12 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground">Ultimo aggiornamento: 24 aprile 2026</p>

        <h2>Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo che i siti visitati inviano al tuo dispositivo. Sono
          utilizzati per far funzionare correttamente il sito, migliorarne le prestazioni e fornire
          informazioni anonime al proprietario.
        </p>

        <h2>Cookie utilizzati</h2>
        <h3>Cookie tecnici (sempre attivi)</h3>
        <ul>
          <li>
            <strong>Sessione Supabase</strong> — autenticazione utenti registrati (solo area
            prenotazioni e admin). Durata: sessione.
          </li>
          <li>
            <strong>gdis-cookie-consent</strong> — memorizza la tua scelta sul banner cookie.
            Durata: 12 mesi.
          </li>
          <li>
            <strong>Cloudflare Turnstile</strong> — verifica anti-bot del form di prenotazione. Durata: sessione.
          </li>
        </ul>

        <h3>Cookie analitici (attivati solo su consenso)</h3>
        <ul>
          <li>
            <strong>Google Analytics 4</strong> — statistiche aggregate di navigazione con IP
            mascherato. Durata massima: 14 mesi. Finalità: comprendere come gli utenti utilizzano il
            sito per migliorarlo.
          </li>
        </ul>

        <h2>Gestione del consenso</h2>
        <p>
          Al primo accesso compare un banner che permette di accettare o rifiutare i cookie non
          necessari. Puoi cambiare idea in qualsiasi momento cancellando i cookie del browser: al
          successivo accesso il banner ricomparirà.
        </p>

        <h2>Come disabilitare i cookie dal browser</h2>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie"
              target="_blank"
              rel="noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noreferrer"
            >
              Apple Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/it-it/microsoft-edge"
              target="_blank"
              rel="noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2>Contatti</h2>
        <p>
          Per domande scrivi a <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.
        </p>
      </article>
    </div>
  );
};

export default Cookie;
