/**
 * URL del Loader Script di Sentry, DERIVATO dalla regione del DSN.
 *
 * Il DSN ha forma https://<publicKey>@o<org>.ingest.<regione>.sentry.io/<id>.
 * Ogni regione serve il loader da un CDN diverso: de -> js-de.sentry-cdn.com,
 * us (o DSN senza token di regione) -> js.sentry-cdn.com. Chiedere la chiave al
 * CDN sbagliato NON da' 404: risponde 200 con uno stub in cui ogni funzione e'
 * vuota, quindi Sentry sembra installato ma non arriva mai un evento (e' il
 * motivo per cui gdis-rent-service non ne ha mai ricevuti).
 *
 * DSN assente o malformato -> null: meglio nessuno script che uno stub muto o
 * una URL con "undefined" dentro.
 */
const HOST_RE = /^(?:o\d+\.ingest\.(?:([a-z]{2})\.)?)?sentry\.io$/;
const PUBLIC_KEY_RE = /^[0-9a-f]{32}$/i;

export function sentryLoaderUrl(dsn: string | undefined | null): string | null {
  if (!dsn) return null;
  let url: URL;
  try {
    url = new URL(dsn.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const publicKey = url.username;
  if (!PUBLIC_KEY_RE.test(publicKey)) return null;
  const host = url.hostname.match(HOST_RE);
  if (!host) return null;
  const region = host[1];
  const cdn = region && region !== "us" ? `js-${region}.sentry-cdn.com` : "js.sentry-cdn.com";
  return `https://${cdn}/${publicKey}.min.js`;
}
