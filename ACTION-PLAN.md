# GDIS Rent — SEO Action Plan

**Audit**: 2026-05-17 · **Health Score**: 77/100 · **Riferimento**: `FULL-AUDIT-REPORT.md`

Ogni voce ha: ID, descrizione, file/dove agire, sforzo stimato, impatto previsto.

---

## CRITICAL (fix immediato, < 24h)

### C1 — GSC: aggiungere service account come utente
**Dove**: Google Search Console > Settings > Users and permissions.
**Cosa**: aggiungere l'email del service account configurato in `~/.config/claude-seo/google.json` come utente "Full" (o almeno "Restricted").
**Perché**: senza questo non si può sapere quali URL sono indicizzati, quali query atterrano, dove cliccano. È il **dato singolo più importante** per un audit SEO. Tutto il resto è proxy.
**Sforzo**: 5 min · **Impatto**: sblocca dati strategici continuativi.

### C2 — Cambiare `en-GB` → `en` (hreflang)
**Dove**: `astro.config.mjs:32` cambiare `en: 'en-GB'` in `en: 'en'`.
**Cosa**: `en-GB` targetizza solo Google UK. Tutti i turisti US, AU, CA, IE, CH, AT, BE, NL che cercano in inglese ricadono fuori dal targeting region-specific. `en` (senza region) coprirebbe tutti.
**Perché**: turismo a Olbia è marcatamente US + DE + UK + scandinavi che parlano inglese. Perdere US e CH/AT è significativo per query come "olbia airport car rental".
**Sforzo**: 10 min (cambio + rebuild + redeploy) · **Impatto**: copertura mercato inglese reale.

### C3 — Pubblicare prezzi su tutte le fleet pages
**Dove**: `src/content/fleet/honda-sh.json`, `yamaha-raptor.json`, `mercedes-classe-a180d.json`. Aggiungere `pricePerDay: <numero>` come già fatto in `fiat-panda.json`.
**Cosa**: pubblicare almeno "a partire da €X/giorno" per ognuno. Idealmente con tabella prezzi per giorni 1/3/7 e alta/bassa stagione.
**Perché**: query transazionali ("quanto costa noleggio quad olbia", "prezzo scooter olbia") e AI citation — un LLM non può rispondere a "quanto costa" se il prezzo è dietro un BookingFlow JS.
**Sforzo**: 2h (decidere policy prezzi pubblici + JSON + rebuild) · **Impatto**: query transazionali sbloccate, AI citation.

---

## HIGH (fix entro 1 settimana)

### H1 — Riscrivere `/chisiamo` con prove E-E-A-T
**Dove**: `src/pages/chisiamo.astro` + `src/pages/en/about-us.astro` + `de/ueber-uns.astro` + `fr/a-propos.astro`.
**Cosa**:
- Togliere "startup digitale nata nel 2025" (auto-celebrativo, senza prove)
- Aggiungere data esatta iscrizione CCIAA con riferimento "CCIAA Sassari, N° REA …, costituita il …"
- Aggiungere foto + nome + ruolo del/i responsabile/i (es. "Giuseppe Deiana, Amministratore Unico" o "Luca, Responsabile Flotta dal 2025")
- Numero veicoli in flotta totale
- P.IVA visibile anche in About (non solo in Termini)
**Perché**: E-E-A-T basso → ranking organico debole su query branded + difficoltà a essere citato da AI.
**Sforzo**: 4h · **Impatto**: trust + branded queries + AI citation.

### H2 — Aggiungere `AggregateRating` su Organization + blocco recensioni
**Dove**: schema in `src/components/organization-schema.astro` (o equivalente) + sezione recensioni in homepage e location pages.
**Cosa**: prendere `ratingValue` e `reviewCount` **reali** da Google Business Profile, non inventarli. Inserire in JSON-LD. Visualmente: blocco con 3-5 recensioni Google con foto recensore (anche solo placeholder se la sezione widget non è ancora pronta).
**Perché**: trust signal #1 per servizi locali. Influenza CTR sulle SERP locali ("4.8★" sotto il title).
**Sforzo**: 3h · **Impatto**: CTR locale + Trust E-E-A-T.

### H3 — Aggiungere `sameAs` array completo su Organization
**Dove**: schema Organization in src/components o config.
**Cosa**: array con URL pubblico GBP, Instagram, eventuale Facebook, TripAdvisor (se presenti), profilo CCIAA pubblico, LinkedIn company.
**Perché**: entity disambiguation per Google e LLM. Brand authority.
**Sforzo**: 1h (raccogliere URL + commit) · **Impatto**: entity matching + AI citation.

### H4 — Coerenza brand name: scegliere "GDIS Rent" canonical
**Dove**: tutti i Title, schema `name`, meta og:site_name, footer, /chisiamo.
**Cosa**: scegliere "GDIS Rent" (corto, brandable, attualmente usato nel Title homepage) come canonical. "GDIS Service SRL" usato solo per legal/footer P.IVA. Eliminare "GDIS Rent Service" se presente.
**Perché**: 3 nomi diversi confondono Google Knowledge Graph e LLM entity matching.
**Sforzo**: 2h (audit + replace + commit) · **Impatto**: brand authority + AI citation.

### H5 — Sitemap: aggiungere `<lastmod>` + alternates su location pages
**Dove**: `astro.config.mjs:42-62` (`serialize()` di `@astrojs/sitemap`).
**Cosa**:
1. `lastmod`: aggiungere `lastmod: new Date().toISOString()` o derivare da `item.lastmod` se disponibile.
2. Alternates per location: mappare manualmente `noleggio-auto-a-X` ↔ `en/car-rental-in-X` ↔ `de/autovermietung-X` ↔ `fr/location-voiture-a-X` con `links: [...]` array nel serialize. Aggiungere x-default.

Esempio (pseudo):
```js
serialize(item) {
  const path = new URL(item.url).pathname;
  const locMap = {
    olbia: { it: '/noleggio-auto-a-olbia', en: '/en/car-rental-in-olbia', de: '/de/autovermietung-olbia', fr: '/fr/location-voiture-a-olbia' },
    // ... per ogni location
  };
  // se path matcha una location key → inietta links: [...]
  return { ...item, lastmod: new Date().toISOString(), ...maybeAlternates };
}
```
**Perché**: crawl prioritization migliore (lastmod), discovery cross-locale più rapida (alternates in sitemap).
**Sforzo**: 4h (mapping + test) · **Impatto**: indicizzazione multi-lingua.

### H6 — CSP: aggiungere Trusted Types directive
**Dove**: `vercel.json` riga 29 (CSP).
**Cosa**: aggiungere alla CSP esistente: `; require-trusted-types-for 'script'; trusted-types default`.
**Attenzione**: test compatibilità code (alcune librerie usano `innerHTML` direttamente — fallirebbero). Se rompe, ripiegare su solo `report-only` per monitoring.
**Perché**: PSI flag severità High su DOM-based XSS mitigation. Non blocca ranking ma riduce attack surface.
**Sforzo**: 2h (audit code + test) · **Impatto**: security score + Lighthouse Best Practices.

---

## MEDIUM (fix entro 1 mese)

### M1 — Creare `/public/llms.txt`
**Dove**: nuovo file `public/llms.txt`.
**Cosa**: formato markdown machine-readable con: nome business, NAP, P.IVA, orari, contatti, aree servite, flotta, FAQ chiave con risposte concise. Mirror EN consigliato a `/public/en/llms.txt`.
**Perché**: feed diretto per LLM (ChatGPT, Perplexity, Claude) per citare il business in risposte travel.
**Sforzo**: 3h (drafting + review legale prezzi se citati) · **Impatto**: AI search citation.

### M2 — Aggiungere `Vehicle`/`Car` schema su fleet pages
**Dove**: `src/pages/flotta/*.astro` e localized variants.
**Cosa**: emettere JSON-LD `Car` con `vehicleEngine`, `fuelType`, `vehicleSeatingCapacity`, `bodyType`, `mileageFromOdometer` non applicabile (è noleggio), ma `priceSpecification` con `PriceSpecification` JSON-LD.
**Perché**: AI citation specifica per modello + rich result potenziale.
**Sforzo**: 4h · **Impatto**: rich result + AI citation.

### M3 — Demote pagine legali in sitemap
**Dove**: `astro.config.mjs` `serialize()`.
**Cosa**: pattern `/privacy|termini|cookie|mappa-sito|datenschutz|agb|conditions|confidentialite|terms` → priority 0.3.
**Perché**: Google in pratica ignora priority ma riduce noise e segnala intenti corretti. Non escludere (devono rimanere indicizzabili per compliance).
**Sforzo**: 30 min · **Impatto**: minore (housekeeping).

### M4 — Verificare overlap content `/noleggio-auto-aeroporto-olbia` vs `/noleggio-auto-a-olbia`
**Dove**: confronto manuale dei due file di contenuto.
**Cosa**: se overlap testuale >60% → unificare con focus airport-specific (orari voli, numero terminal, gate, lista compagnie aeree servite, distanza desk-arrivi). Se la pagina aeroporto è solo "noleggio + nome aeroporto + frase generica", è duplicate/thin.
**Perché**: rischio cannibalizzazione + thin content.
**Sforzo**: 4h (review + riscrittura airport-specific) · **Impatto**: query "noleggio auto aeroporto olbia" (alta intenzione).

### M5 — Verificare quali URL `/localita/*` Google ha indicizzato storicamente
**Dove**: GSC > Index > Pages (dopo C1) + Search Analytics filtrato per URL pattern.
**Cosa**: se esistono URL `/localita/*` indicizzati che non sono in `vercel.json:73-79` (es. `/localita/olbia` senza prefisso "noleggio-"), aggiungere il redirect.
**Perché**: URL legacy indicizzati ora 404 = perdita link equity.
**Sforzo**: 1h (dopo C1) · **Impatto**: recupero link equity.

### M6 — Risolvere color contrast issues (PSI Accessibility 97)
**Dove**: file CSS/Tailwind classi con contrasto sotto 4.5:1.
**Cosa**: ispezione PSI report — identificare gli elementi specifici con contrast issue e correggere palette.
**Perché**: A11y compliance + indirect SEO benefit (Lighthouse score completo).
**Sforzo**: 3h · **Impatto**: A11y compliance.

### M7 — Image optimization
**Dove**: tutte le immagini servite via Supabase CDN.
**Cosa**: verificare che alt text sia descrittivo (non `alt=""` o `alt="image"`); che le dimensioni servite siano responsive (Astro `<Image>` con `widths`); WebP/AVIF preferred; lazy-loading sotto-fold.
**Perché**: PSI flag image-delivery-insight; SERP image rankings; CWV LCP impact.
**Sforzo**: 6h (audit + fix) · **Impatto**: CWV + image SEO.

---

## LOW (backlog)

### L1 — Aggiungere video (YouTube) su pagine flotta o location
**Cosa**: video di 30-60s "Consegna VIP all'aeroporto di Olbia", "Tour Fiat Panda Hybrid", "Quad in Costa Smeralda". Embed YouTube + `VideoObject` schema.
**Perché**: presenza video è il segnale di correlazione più forte (0.737) con AI citation. Anche un solo video aumenta significativamente la probabilità di essere citati da AI Overviews.
**Sforzo**: 1 settimana · **Impatto**: AI visibility + dwell time.

### L2 — Aggiungere pagine "X vs Y" / "Migliori noleggi auto Olbia"
**Cosa**: pagina comparativa tipo "GDIS Rent vs Maggiore Olbia" o "Migliori autonoleggi a Olbia: confronto 2026" onesta con pro/contro.
**Perché**: AI ama "X vs Y" — query frequenti ("noleggio auto olbia migliore", "alternativa a hertz olbia").
**Sforzo**: 1-2 giorni · **Impatto**: comparative queries.

### L3 — Aggiungere `founder` su Organization schema
**Cosa**: `"founder": {"@type": "Person", "name": "Giuseppe Deiana"}`.
**Perché**: entity signal + Knowledge Graph.
**Sforzo**: 15 min · **Impatto**: minore.

### L4 — Wikidata entity per "GDIS Rent"
**Cosa**: creare entry Wikidata con NAP, sito, sameAs.
**Perché**: entity disambiguation forte per LLM.
**Sforzo**: 2h + revisione community Wikidata · **Impatto**: long-term AI authority.

### L5 — Citation building Sardegna-specific
**Cosa**: submission a Sardegna.it, VisitSardinia, PagineGialle, Yelp, TripAdvisor, GuidaItalia.
**Perché**: NAP consistency + autorità locale.
**Sforzo**: 1 giorno · **Impatto**: local rankings.

---

## Roadmap suggerita (2 settimane)

**Settimana 1 (focus quick win + critical):**
- C1 (GSC permission) — lun
- C2 (en-GB → en) — lun
- C3 (prezzi fleet) — mar-mer
- H1 (`/chisiamo`) — gio-ven
- H2 (AggregateRating + recensioni) — ven

**Settimana 2 (foundation):**
- H3 (sameAs) + H4 (brand coerenza) — lun
- H5 (sitemap lastmod + alternates) — mar-mer
- H6 (CSP Trusted Types) — gio
- M1 (llms.txt) — ven

Dopo 2 settimane: ricontrollare GSC per impressions/queries (richiede 7-14 giorni post-fix per stabilizzarsi) e baseline SEO drift con `python scripts/drift_baseline.py https://gdisrentservice.com`.
