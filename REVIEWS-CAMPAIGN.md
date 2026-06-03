# Campagna Recensioni Google — Operations Playbook

**Obiettivo**: passare da **1 recensione** a **10+ recensioni reali** in 60-90 giorni per sbloccare:
- ⭐ Stelle visibili in SERP locale (richiede ≥5 review per `AggregateRating` rich result)
- Trust signal su homepage (potremo sostituire i testimonial placeholder con quelli reali)
- Citazioni in AI search (ChatGPT/Perplexity citano business con review autorevoli)

## Assets pronti

| File | Uso |
|------|-----|
| `public/qr-review-google.svg` | QR vettoriale per contratto digitale firmato, brochure, biglietti consegna |
| `public/qr-review-google.png` | QR raster 250x250 per stampa veloce / WhatsApp share |
| URL diretto Google | `https://share.google/tf8KP7sbkHZijL5uv` (apre profilo GBP, click "Scrivi una recensione") |

**Stampa il QR**: aprire il PNG → stampa formato cartolina A6 (10×15 cm) → consegnare insieme alle chiavi del veicolo. **Conversion rate atteso**: 15-25% con QR fisico.

## Template messaggi pronti

### WhatsApp post-riconsegna (24-48h dopo restituzione veicolo)

**IT** (clienti italiani):
```
Ciao [Nome] 👋

Grazie ancora per aver scelto GDIS Rent per il tuo soggiorno in [Costa Smeralda/Olbia/...].

Se ti sei trovato bene, ci aiuteresti con una recensione di 30 secondi su Google? 
È il modo migliore per supportare la nostra realtà locale.

👉 https://share.google/tf8KP7sbkHZijL5uv

Anche solo 5 stelle (senza testo) ci aiutano tantissimo. Grazie davvero! 🙏
```

**EN** (clienti internazionali):
```
Hi [Name] 👋

Thanks again for choosing GDIS Rent during your stay in [Costa Smeralda].

If you enjoyed the service, would you spend 30 seconds writing a Google review?
It really helps a small local business like ours.

👉 https://share.google/tf8KP7sbkHZijL5uv

Even just 5 stars (no text needed) makes a huge difference. Thanks so much! 🙏
```

**DE**:
```
Hallo [Name] 👋

Vielen Dank, dass Sie sich für GDIS Rent während Ihres Aufenthalts in [Costa Smeralda] entschieden haben.

Wenn Sie zufrieden waren, würden Sie uns mit einer 30-Sekunden Google-Bewertung helfen?
Es bedeutet sehr viel für ein kleines lokales Unternehmen wie unseres.

👉 https://share.google/tf8KP7sbkHZijL5uv

Auch nur 5 Sterne (ohne Text) helfen enorm. Vielen Dank! 🙏
```

**FR**:
```
Bonjour [Nom] 👋

Merci encore d'avoir choisi GDIS Rent pour votre séjour en [Costa Smeralda].

Si vous avez apprécié le service, pourriez-vous nous laisser un avis Google en 30 secondes ?
C'est le meilleur moyen de soutenir une petite entreprise locale.

👉 https://share.google/tf8KP7sbkHZijL5uv

Même seulement 5 étoiles (sans texte) nous aide énormément. Merci ! 🙏
```

### Email follow-up (3-5 giorni dopo riconsegna)

Per clienti che hanno fornito email ma non hanno risposto al WhatsApp:

**Subject (IT)**: "Grazie per aver scelto GDIS Rent — ci lasci una recensione?"

```
Ciao [Nome],

speriamo che la tua esperienza con GDIS Rent sia stata positiva e che il tuo soggiorno
in Sardegna sia stato indimenticabile.

Per noi, che siamo una giovane realtà locale di Olbia, ogni recensione conta moltissimo.
Aiuti altre persone a scoprire il nostro servizio e ci permetti di crescere.

Bastano 30 secondi:
👉 Lascia una recensione su Google: https://share.google/tf8KP7sbkHZijL5uv

Anche se hai avuto un problema, ti chiediamo comunque un feedback onesto — è l'unico
modo per migliorare. Se preferisci scriverci direttamente prima, rispondi a questa
email o WhatsApp +39 352 045 9150.

Grazie davvero!
Il team GDIS Rent
Via Annibale Caro 52, Olbia · gdisrentservice.com
```

## Operational cadence consigliato

| Quando | Azione | Canale |
|--------|--------|--------|
| **Al ritiro** | Consegna QR fisico insieme alle chiavi: "Se ti trovi bene, ti chiedo un secondo per una recensione su Google. Scansiona il QR a fine vacanza" | Fisico (cartolina A6) |
| **Riconsegna +24h** | Messaggio WhatsApp template sopra | WhatsApp |
| **Riconsegna +5 giorni** | Email follow-up template (solo se no risposta WhatsApp e cliente ha lasciato email) | Email |
| **Riconsegna +30 giorni** | Skip — oltre 30 giorni il momentum è perso, meglio focarsi su nuovi clienti | — |

## Best practice (importante)

1. **Mai chiedere "una buona recensione"** o "5 stelle" esplicitamente: viola le policy Google e può portare alla rimozione recensioni o sospensione GBP. Chiedi "una recensione onesta".
2. **Mai offrire sconti o regali** in cambio di recensioni: anche questo è policy violation.
3. **Mai chiedere recensioni in batch** (es. compilare un foglio Excel di nomi e contattarli tutti lo stesso giorno): Google detecta pattern di "review velocity" anomala e penalizza.
4. **Distribuisci uniformemente**: target 1-3 recensioni/settimana sostenibili invece di 10 in un giorno.
5. **Rispondi a ogni recensione** (anche negative) entro 7 giorni: segnale di trust + algoritmo GBP premia.

## Quando avremo 5+ recensioni reali

Mandami via WhatsApp/email:
- Link diretti alle 5+ recensioni Google reali (o screenshot)
- Per ogni recensione: nome (o iniziali) + città + 1-2 frasi del testo + data approssimativa

Io aggiungerò:
- `AggregateRating` schema (con rating reale, mai inventato) su Organization + LocalBusiness
- `Review` schema individuale per ogni recensione importante (per rich snippets in AI search)
- Sostituzione testimonial placeholder homepage con i nomi/testi reali
- Update `/llms.txt` × 4 locali con citazioni recensioni reali (boost AI citation)

A quel punto le **stelle saranno visibili in SERP** sotto il titolo del sito → CTR +35-50% atteso su query locali.

## Tracking risultati

Conta a mano in GBP dashboard:
- **Week 0** (oggi): 1 recensione, rating 5.0
- Target **Week 4**: 5 recensioni
- Target **Week 8**: 10 recensioni
- Target **Week 12**: 15+ recensioni + sblocco stelle SERP

Quando avrai 5 recensioni, riesegui `/seo audit https://gdisrentservice.com` per misurare l'impatto su Health Score e GEO readiness.
