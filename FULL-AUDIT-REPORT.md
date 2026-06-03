# SEO Audit Completo — gdisrentservice.com

**Data**: 2026-05-17
**Branch**: astro-migration
**Stack**: Astro 5 SSG static + Vercel
**Locales**: it (default), en, de, fr
**Business**: GDIS Service SRL — noleggio auto Olbia, Costa Smeralda
**Target keyword**: noleggio auto olbia

---

## SEO Health Score: 77 / 100 — B+

Aggregato pesato:

| Categoria              | Peso | Score | Contributo |
|------------------------|------|-------|------------|
| Technical SEO          | 22%  | 85    | 18.7       |
| Content Quality        | 23%  | 71    | 16.3       |
| On-Page SEO            | 20%  | 78    | 15.6       |
| Schema / Structured    | 10%  | 80    | 8.0        |
| Performance (CWV lab)  | 10%  | 88    | 8.8        |
| AI Search Readiness    | 10%  | 62    | 6.2        |
| Images                 | 5%   | 75    | 3.8        |
| **TOTALE**             |      |       | **77.4**   |

Il sito ha una **base tecnica solida** (security headers enterprise-grade, AI-bots ammessi esplicitamente, sitemap auto-generato, schema ricco). Le aree deboli sono **content trust signals** (recensioni, autorialità, prezzi flotta) e **AI/GEO content** (llms.txt, FAQ in prosa).

---

## Executive Summary

### Top 5 problemi critici
1. **GSC service account senza permessi** — impossibile accedere a query, impressions, indexazione. Bisogna aggiungere l'email service account a Settings > Users in Search Console.
2. **`en-GB` come hreflang code** — esclude turisti US, AU, CA, CH, AT, IE che cercano in inglese. Astro config riga 32 `en: 'en-GB'` → cambiare in `en: 'en'`.
3. **Prezzi assenti su 3 veicoli su 4** — Honda SH, Yamaha Raptor, Mercedes A180d non hanno `pricePerDay` nel content JSON. Blocca query transazionali ("quanto costa noleggio scooter olbia") e AI citation.
4. **Nessuna recensione visibile / nessun `AggregateRating` su Organization** — trust gap grosso per un noleggio auto locale, dove le recensioni sono il segnale #1 di decisione.
5. **`/chisiamo` thin + auto-promozionale** — "startup digitale nata nel 2025" senza prove, nessuna foto/nome operativo, nessun riferimento CCIAA. E-E-A-T basso.

### Top 5 quick wins (impatto alto, sforzo basso)
1. Cambiare `en-GB` → `en` in `astro.config.mjs` + rigenerare sitemap (10 min).
2. Pubblicare i prezzi "da €X/giorno" su Honda SH, Yamaha Raptor, Mercedes A180d nei file JSON `src/content/fleet/*.json` con markup `PriceSpecification` (1h).
3. Creare `public/llms.txt` con NAP, orari, contatti, FAQ in formato machine-readable (2h).
4. Aggiungere `sameAs` array nell'Organization schema verso Google Business Profile, Instagram, eventuale Facebook (30 min).
5. Aggiungere blocco recensioni nella homepage + `AggregateRating` sull'Organization (anche solo 4.8/5 con N recensioni reali da GBP) (2h).

---

## 1. Technical SEO — 85/100

**Excellent foundation.**

### Cosa funziona
- HSTS preload attivo: `max-age=63072000; includeSubDomains; preload`
- X-Frame-Options: DENY; X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera/microphone disabilitati, geolocation=self, interest-cohort=()
- CSP strict con allowlist precisa (Supabase, GTM, GA, Cloudflare Turnstile)
- robots.txt **esplicito** per AI bots: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended tutti `Allow: /`
- Sitemap-index disponibile a `/sitemap-index.xml` (rinominato da `/sitemap.xml` con redirect 301)
- trailingSlash: 'never' coerente nel codice e nei header
- output: 'static' → tutto pre-renderizzato server-side, niente JS rendering issues per crawler
- Canonical tags presenti
- HTTPS forzato, redirect www → apex via vercel.json

### Findings
| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| T1 | High | CSP manca `require-trusted-types-for 'script'` (PSI: severità High, mitiga XSS DOM-based) | Aggiungere alla CSP in `vercel.json` dopo test compatibilità code |
| T2 | Medium | Redirect vercel.json copre solo 8 path `/localita/noleggio-*` espliciti. Se Google ha indicizzato altri pattern (es. `/localita/olbia` senza "noleggio-"), ora 404. | Verificare su GSC quali URL `/localita/*` hanno mai ricevuto impression; aggiungere redirect mancanti |
| T3 | Low | `vercel.json` riga 73-79: solo 7 redirect localita, ma in sitemap esistono 8 location IT (manca `/noleggio-auto-in-costa-smeralda` come sorgente — c'è solo `/noleggio-in-costa-smeralda` → `/noleggio-auto-in-costa-smeralda`) | Verificare coerenza vecchi URL |

---

## 2. Content Quality — 71/100

Riferimento: report subagent content-quality (file: src/content/locations/*.json, src/content/fleet/*.json, src/pages/chisiamo.astro)

### E-E-A-T breakdown
- **Experience**: 14/20 — dati operativi reali (consumi 4.5-5 L/100km Panda, autonomia Raptor 150-180 km, gestione ritardi traghetti). Manca: testimonianze cliente.
- **Expertise**: 19/25 — contenuto tecnico accurato (ZTL Olbia, SS125/SS131, patenti). Manca: autore/responsabile editoriale nominato.
- **Authoritativeness**: 14/25 — P.IVA presente. Manca: sameAs verso profili verificati (GBP, TripAdvisor), citazioni esterne, embed recensioni Google.
- **Trust**: 20/30 — NAP coerente, termini aggiornati (24 apr 2026). Manca: polizza assicurativa nominata, franchigie visibili in fleet page, attestato CCIAA.

### Word count location pages (verificato live)
| Pagina | Parole | Soglia (location page) | OK? |
|--------|--------|------------------------|-----|
| /noleggio-auto-a-olbia (IT) | 1647 | >800 | OK |
| /en/car-rental-in-olbia | 1666 | >800 | OK |
| /de/autovermietung-olbia | 1643 | >800 | OK |

Le location pages sono ben sopra la soglia thin. Nessun trigger del quality gate (7 location pages IT < 30).

### Pagine a rischio
- `/chisiamo` (vedi C/H1 in action plan) — thin, auto-celebrativo
- Fleet pages Honda SH / Yamaha Raptor / Mercedes A180d — manca prezzo (citation gap)
- Stand-alone /noleggio-auto-aeroporto-olbia, /noleggio-auto-porto-olbia, /noleggio-auto-stazione-olbia — word count e overlap con `/noleggio-auto-a-olbia` da verificare; rischio duplicate latente

---

## 3. On-Page SEO — 78/100

- Title homepage: "Noleggio Auto Olbia e Costa Smeralda | GDIS Rent" — keyword primaria in apertura, brand finale, 51 caratteri. OK.
- Meta description: "Noleggio auto a Olbia e Costa Smeralda ✓ Consegna VIP in Aeroporto e Porto Isola Bianca ✓ Fiat Panda, Mercedes, scooter, quad ✓ Zero code. WhatsApp H24." — checkmark visivi, value prop, CTA implicita. OK.
- H1: 1 ✓ — H2: 7 ✓ — struttura heading sana.
- Canonical: `https://gdisrentservice.com/` ✓
- Hreflang on-page: tutte 4 locali + x-default presenti e reciproche (verificato su 3 location pages: IT/EN/DE Olbia).
- Internal linking: localizzato correttamente (i link contenuto nelle pagine EN puntano a `/en/*`; gli unici `/noleggio-auto-a-*` nelle pagine EN sono il language switcher con `hreflang="it-IT"`, comportamento corretto).
- Brand inconsistency: "GDIS Rent" / "GDIS Service SRL" / "GDIS Rent Service" — scegliere canonical, vedi H6.

---

## 4. Schema / Structured Data — 80/100

### Homepage (6 schema blocks)
- Organization
- WebSite
- LocalBusiness + AutoRental (multi-type — eccellente per noleggio auto)
- 3 × Service

### Location pages (esempio /noleggio-auto-a-olbia)
- Organization, PostalAddress, ContactPoint
- WebSite
- GeoCoordinates, PostalAddress
- OpeningHoursSpecification × 2
- City, Airport, Place (entity locali ben sviluppate)
- **FAQPage** con SpeakableSpecification + Question/Answer

### Gap
| ID | Issue | Fix |
|----|-------|-----|
| S1 | `AggregateRating` assente da Organization e LocalBusiness | Aggiungere `aggregateRating` con `ratingValue` e `reviewCount` reali (presi da GBP), non inventati |
| S2 | `sameAs` array incompleto su Organization (solo Instagram noto) | Aggiungere URL GBP, eventuale Facebook, TripAdvisor, profilo CCIAA |
| S3 | `founder` non esposto: Giuseppe Deiana Amm. Unico → segnale entity | Aggiungere `founder` con `Person` in Organization schema |
| S4 | `FAQPage` su sito commerciale: Google Aug 2023 → no rich results per non-gov/healthcare | **Tenere** lo schema (benefit AI/LLM citation), priority Info — non azione critica |
| S5 | `priceRange` su LocalBusiness non verificato | Aggiungere `priceRange: "€€"` o numerico se policy aziendale lo permette |
| S6 | `Vehicle`/`Car` schema su fleet pages non verificato | Verificare; se mancante, aggiungere `Car` con `vehicleEngine`, `fuelType`, `vehicleSeatingCapacity` |

---

## 5. Performance — 88/100

### PSI Lighthouse (lab data)
| Strategy | Performance | SEO | Accessibility |
|----------|-------------|-----|---------------|
| Mobile   | 88          | 100 | 97            |
| Desktop  | 99          | 100 | 97            |

### Failed audits (mobile, top 8)
- color-contrast (A11y) — issue minore
- image-delivery-insight — formati/dimensioni immagini
- unused-javascript
- render-blocking-insight
- unused-css-rules
- network-dependency-tree
- cache-insight
- first-contentful-paint (sotto soglia ideale)

### CrUX (field data)
- **Insufficient Chrome traffic volume** — non eligible. Il sito è troppo piccolo per avere dati CrUX. Non è un difetto: è una conseguenza del traffico ridotto attuale.

---

## 6. AI Search Readiness (GEO) — 62/100

### Forte
- robots.txt esplicito: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended tutti `Allow: /` ← molti competitor non hanno questa configurazione
- Schema FAQPage su ogni location page → passages citabili
- Schema LocalBusiness + AutoRental + GeoCoordinates → entity matching forte
- 4 lingue → copertura ChatGPT/Perplexity in 4 mercati

### Debole
- **llms.txt assente** (`HTTP 404` confermato live)
- Brand naming inconsistente ("GDIS Rent" / "GDIS Service" / "GDIS Rent Service") → entity disambiguation difficile per LLM
- `sameAs` Organization solo Instagram → entity verification debole
- Nessun video YouTube (segnale di correlazione AI citation più alto: 0.737)
- Nessun confronto vs competitor on-site (AI ama "X vs Y")
- Prezzi assenti su 3 veicoli → no citation transazionale

---

## 7. Sitemap — Issue specifiche

URL totali: 90+ across 4 locales. Auto-generato da `@astrojs/sitemap` con i18n config.

| ID | Sev | Issue | Fix |
|----|-----|-------|-----|
| SM1 | High | **Hreflang alternates assenti nel sitemap** per le location pages (`/noleggio-auto-a-olbia`, `/en/car-rental-in-olbia`, ecc.). On-page hreflang remediates per Google, ma sitemap è best-practice e accelera discovery cross-locale. Causa: `@astrojs/sitemap` rileva alternates solo se i path differiscono solo per prefisso locale. I tuoi slug sono totalmente diversi per lingua (`noleggio-auto-a-` vs `car-rental-in-` vs `autovermietung-` vs `location-voiture-a-`). | Implementare un custom mapping nel `serialize()` di `astro.config.mjs` per emettere `<xhtml:link>` alternates esplicite per ogni gruppo di location pages |
| SM2 | Medium | **`<lastmod>` assente ovunque** nel sitemap | Aggiungere nel `serialize()`: `lastmod: item.lastmod || new Date().toISOString()` o derivarlo da Git history |
| SM3 | Low | Pagine legali (`/privacy`, `/termini`, `/cookie`, `/mappa-sito`, `/de/agb`, `/de/datenschutz` ecc.) con priority 0.7 — dilute il segnale | Nel `filter()` o `serialize()` portarle a priority 0.3 o escluderle (mantenendole indicizzabili ma fuori sitemap) |
| SM4 | Info | `changefreq=daily` su homepages — Google ignora changefreq | Cosmetico, nessuna azione richiesta |
| SM5 | Medium | `en-GB` come hreflang per /en — escludente per US, AU, CA, IE, CH (DE/FR Swiss), AT | Cambiare in `en` semplice (vedi C2) |
| SM6 | Medium | x-default assente nel sitemap (presente solo on-page) | Aggiungere `<xhtml:link rel="alternate" hreflang="x-default" href="...">` in tutti i gruppi multi-locale |

---

## 8. Local SEO — verificato signals on-site

### NAP / trust
- Indirizzo: Via Annibale Caro 52, Olbia — presente in schema ✓ (verificato OpeningHoursSpecification, PostalAddress, GeoCoordinates 40.9292, 9.4836)
- P.IVA 03047140904 — in termini.astro e in siteSchema ✓
- Telefono WhatsApp H24 — visibile

### Service area
- 7 location pages IT + 1 Costa Smeralda + 3 hub (aeroporto, porto, stazione) = 11 hub IT
- Stessi 11 in EN, DE; in FR mancano alcuni
- Quality gate: 11 location IT < 30 → nessun warning

### Gap
| ID | Issue | Fix |
|----|-------|-----|
| L1 | Nessun GBP review embed/widget visibile | Aggiungere blocco recensioni in homepage + LocationPage |
| L2 | Nessuna citation building tracciata (PagineGialle, Yelp, Sardegna.it, VisitSardinia) | Eseguire citation audit + submission |
| L3 | Local schema senza `aggregateRating` reale | Vedi S1 |

---

## 9. Google API access

| API | Status | Note |
|-----|--------|------|
| PageSpeed Insights v5 | OK | Performance dati estratti |
| CrUX | Insufficient traffic | Origin non eligible |
| CrUX History | Insufficient traffic | Origin non eligible |
| GSC Search Analytics | **Permission denied** | Service account non aggiunto a Settings > Users in Search Console |
| GSC URL Inspection | Bloccato (stesso) | Aggiungere service account |
| GA4 | Da testare | Property ID non confermato per gdisrentservice.com |
| Indexing API v3 | OK | Disponibile per ping post-deploy |

---

## Note metodologiche

- **Audit eseguito 2026-05-17**: live site `gdisrentservice.com`, branch locale `astro-migration` (uncommitted: admin panel WIP, non oggetto di questo audit).
- **Dati**: live HTTP (curl), PSI v5 (Google API), parse JSON-LD on-page, file system codebase Astro.
- **Subagent**: 5 subagent SEO specialisti spawned in parallelo. Content-quality completato con report integrale. Schema/Technical/Sitemap/Local stopped mid-process (limiti tool nel sandbox subagent) → coperti inline dall'orchestratore con verifica live diretta. GEO subagent ha prodotto report ma con assunzioni stale (es. "robots.txt assente") — corrette qui dal check live (robots.txt esiste con AI bots allow espliciti).
- **GSC indexation data NON disponibile**: la cosa più importante che manca per chiudere l'audit è "quali URL Google ha effettivamente indicizzato e con quali query atterrano?". Fix: aggiungere il service account a GSC.

---

## Prossimi passi

→ Vedi `ACTION-PLAN.md` per la lista prioritizzata Critical / High / Medium / Low con effort stimato.
