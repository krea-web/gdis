# DEPLOY CHECKLIST — GDIS Rent & Service

Guida passo-passo per portare il sito online in modo sicuro e ottimizzato. Segui gli step nell'ordine indicato.

---

## 1. Sicurezza — rotazione chiavi Supabase (CRITICO)

La vecchia chiave anon è stata esposta in git history. Prima del go-live:

1. Vai su **Supabase Dashboard** → progetto `zgazhrzjgefvjxknyffy` → **Settings → API**.
2. Click su **Regenerate anon / service_role key** (anon key).
3. Copia la nuova anon key.
4. Vai su **Vercel Dashboard** → progetto gdis → **Settings → Environment Variables**.
5. Aggiorna le seguenti variabili (tutte ambienti: Production / Preview / Development):

| Variable | Valore |
| --- | --- |
| `PUBLIC_SUPABASE_URL` | `https://zgazhrzjgefvjxknyffy.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | (nuova anon key) |
| `PUBLIC_TURNSTILE_SITE_KEY` | (vedi step 5) |
| `PUBLIC_GA_ID` | `G-0SH3YF3Y65` (default già nel codice) |
| `SUPABASE_SERVICE_ROLE_KEY` | (build-time, server-only) |

6. Sul tuo computer locale rimuovi `.env` dal tracking git: `git rm --cached .env` + commit.
7. Ricrea il file `.env` locale copiandolo da `.env.example` con i valori aggiornati.

---

## 2. Migrazione RLS Supabase (CRITICO)

La migrazione `supabase/migrations/20260424_secure_rls.sql` irrigidisce le policy:

- `bookings`: INSERT/SELECT/UPDATE solo via `service_role` (Edge Function).
- `vehicles`: lettura pubblica filtrata `available = true`.
- Storage bucket `licenses`: privato, signed URL via Edge Function.

### Come applicarla

Con Supabase CLI installato:
```bash
supabase link --project-ref zgazhrzjgefvjxknyffy
supabase db push
```

Oppure: copia il contenuto della migration nell'editor SQL di Supabase Dashboard ed esegui.

---

## 3. Edge Function n8n-proxy

La logica di prezzo autoritativo e validazione server-side è in `supabase/functions/n8n-proxy/index.ts`.

```bash
supabase functions deploy n8n-proxy
```

Env vars server-side (Supabase Dashboard → Edge Functions → Secrets):
- `N8N_WEBHOOK_URL` — URL webhook n8n
- `TURNSTILE_SECRET_KEY` — secret Cloudflare Turnstile (step 5)

---

## 4. OG Images (Supabase Storage)

Carica su bucket pubblico `asset/og/` immagini 1200×630 WebP con questi nomi:

- `og-home.webp`
- `og-olbia.webp`, `og-porto-cervo.webp`, `og-san-teodoro.webp`, `og-san-pantaleo.webp`,
  `og-porto-rotondo.webp`, `og-golfo-aranci.webp`, `og-baja-sardinia.webp`, `og-costa-smeralda.webp`
- `og-fiat-panda.webp`, `og-honda-sh.webp`, `og-yamaha-raptor.webp`, `og-mercedes-a180d.webp`
- `og-aeroporto-olbia.webp`, `og-porto-olbia.webp`, `og-stazione-olbia.webp`
- `og-prenotaora.webp`, `og-chisiamo.webp`, `og-contatti.webp`

Finché non ci sono, il sito userà il logo come fallback (gestito nel componente `SEOHead`).

---

## 5. Cloudflare Turnstile (CAPTCHA)

1. Vai su https://dash.cloudflare.com → **Turnstile**.
2. **Add Site**: nome "GDIS Rent", dominio `gdisrentservice.com`.
3. Widget Mode: **Managed** (invisibile se possibile).
4. Copia **Site Key** e **Secret Key**.
5. Aggiungi su Vercel env:
   - `PUBLIC_TURNSTILE_SITE_KEY` (public, client)
6. Aggiungi su Supabase Edge Functions Secrets:
   - `TURNSTILE_SECRET_KEY` (server, non esporre al client)

---

## 6. Google Analytics 4

1. https://analytics.google.com → **Admin → Create property**.
2. Proprietà: "GDIS Rent", timezone Italia, currency EUR.
3. Crea data stream **Web** per `https://gdisrentservice.com`.
4. Copia il Measurement ID `G-XXXXXXXXXX`.
5. Aggiungi su Vercel env var `PUBLIC_GA_ID` (default `G-0SH3YF3Y65`); `src/components/Analytics.astro` lo carica solo in `import.meta.env.PROD` con Consent Mode v2 default `denied`.
6. Il file `src/components/CookieBannerIsland.tsx` chiama `window.gdisGrantConsent(true|false)` per aggiornare il consenso.

Il **CookieBanner** già blocca GA4 fino al consenso dell'utente (Consent Mode v2).

---

## 7. Google Search Console

1. https://search.google.com/search-console → **Add Property**.
2. Scegli **Domain** (verifica DNS TXT) oppure **URL prefix** (meta tag).
3. Se scegli URL prefix: copia il meta tag, decommenta in `index.html` riga ~45 e sostituisci il valore.
4. Dopo il deploy, vai su **Sitemap → Add new sitemap** e inserisci `https://gdisrentservice.com/sitemap.xml`.
5. Vai su **URL Inspection** e richiedi indicizzazione manuale delle 3 pagine strategiche:
   - `/noleggio-auto-a-olbia`
   - `/`
   - `/noleggio-auto-in-costa-smeralda`

---

## 8. Bing Webmaster Tools

1. https://www.bing.com/webmasters → **Sign in** con account Microsoft.
2. Clicca **Import from Google Search Console** (se già fatto lo step 7) per importare tutto automaticamente.
3. Oppure: aggiungi manualmente il sito + meta tag (riga ~48 di `index.html`) + sitemap.

---

## 9. ~~Prerender.io~~ — NON PIÙ NECESSARIO

Il sito è ora **SSG (Static Site Generation) tramite Astro 5**: ogni pagina è HTML completo al primo byte. I crawler (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot) ricevono direttamente il markup renderizzato — niente Prerender.io, niente rewrite per User-Agent.

Se hai un account Prerender.io legacy, puoi cancellarlo e rimuovere `PRERENDER_TOKEN` da Vercel.

### Test rapido (post-deploy)
```bash
curl -A "Googlebot" https://gdisrentservice.com/noleggio-auto-a-olbia | head -50
```
Deve restituire HTML completo con `<title>`, `<meta description>`, JSON-LD inline, canonical e contenuto testuale.

---

## 10. Google Business Profile (FONDAMENTALE per Local Pack)

Senza un profilo Google Business il sito **non comparirà nel Local Pack** per la query "noleggio auto olbia".

1. https://business.google.com → **Add your business**.
2. Nome: **GDIS Rent & Service**.
3. Categoria primaria: **Car rental agency** (Agenzia di autonoleggio).
4. Categorie secondarie: **Motor scooter dealer**, **ATV dealer**.
5. Indirizzo: **Via Annibale Caro 52, 07026 Olbia (SS)**.
6. Telefono: **+39 352 045 9150**.
7. Sito web: `https://gdisrentservice.com`.
8. Orari:
   - Lun–Ven 09:00–19:00
   - Sab–Dom 11:30–17:30
   - Nota: "Consegna veicoli H24 su prenotazione WhatsApp"
9. Verifica (cartolina o telefono) — può richiedere 5–14 giorni.
10. Una volta verificato: carica foto esterni/interni sede + flotta + logo, e chiedi ai primi clienti di lasciare recensioni.

---

## 11. Deploy su Vercel

Una volta completati gli step 1-10:

```bash
git add .
git commit -m "Pre-deploy: security + SEO/AEO/GEO hardening"
git push origin main
```

Vercel triggerà automaticamente il build. Verifica:

- [ ] Build succede senza errori TypeScript
- [ ] Dominio `gdisrentservice.com` punta a Vercel (DNS A/CNAME)
- [ ] Certificato SSL auto (Let's Encrypt) emesso
- [ ] Redirect `https://` forzato

---

## 12. Verifica post-deploy

### Schema
- https://validator.schema.org/ → incolla URL homepage, olbia, fiat-panda → 0 errori
- https://search.google.com/test/rich-results → controlla FAQ eligibility, Product, LocalBusiness

### Headers di sicurezza
```bash
curl -I https://gdisrentservice.com
```
Verifica presenza di: `Strict-Transport-Security`, `X-Frame-Options: DENY`,
`Content-Security-Policy`, `X-Content-Type-Options: nosniff`.

### Performance
- https://pagespeed.web.dev/ → URL homepage e olbia
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms, Performance > 90

### RLS Supabase
Apri console browser su `https://gdisrentservice.com` (NON autenticato):
```js
const sb = window.supabase; // se esposto, altrimenti importa
await sb.from('bookings').select('*');  // deve fallire / restituire array vuoto
```

### Turnstile
Tenta un booking senza token → rejected dal server.

### Redirect legacy URL
```bash
curl -I https://gdisrentservice.com/localita/noleggio-olbia
# HTTP/2 308 (permanent redirect)
# location: /noleggio-auto-a-olbia
```

---

## 13. Monitoraggio continuo (prime 4 settimane)

- **Giorno 1**: GSC URL Inspection su 3 pagine strategiche → Request indexing.
- **Settimana 1**: GSC → Coverage — verificare che tutti gli URL siano in "Valid".
- **Settimana 2**: controlla `site:gdisrentservice.com` su Google → target ≥ 20 pagine indicizzate.
- **Settimana 2-4**: GSC → Performance — impression per query:
  - "noleggio auto olbia"
  - "noleggio auto costa smeralda"
  - "noleggio auto aeroporto olbia"
- Recensioni Google Business → rispondi a tutte entro 24h.

---

## Note importanti

- **PEC aziendale**: `gdis.servicesrl@pecdotcom.it` — verifica con il gestore PEC che sia attiva
  prima di metterla in Footer pubblico. Se il dominio non risponde potrebbe essere un errore di trascrizione.
- **Logo 512×512 quadrato** serve per Google Business Profile e PWA manifest — se il logo attuale è landscape, creare una versione quadrata dedicata.
- **Foto flotta**: Google Business Profile e OG images si arricchiscono con foto professionali dei veicoli + uniforme operatore in aeroporto. Suggerito: shooting estivo dedicato.
