# Moz API Setup (free tier, 2500 rows/month)

> **Perché**: senza Moz API non possiamo misurare la qualità dei backlink esistenti (DA/PA), né analizzare i backlink dei competitor per pianificare l'outreach. Con Moz API gratis ottengo: 2500 query/mese, sufficienti per audit completo di gdisrentservice.com + 4-5 competitor + monitoring mensile.

---

## STEP 1 — Crea account Moz (5 min)

1. Vai su [moz.com/community/join](https://moz.com/community/join) e registrati con `kreafase1@gmail.com`
2. Conferma email
3. Login → vai su [moz.com/account/api](https://moz.com/account/api)
4. Click **"Create new token"**
5. Copia i due valori:
   - **Access ID** (es. `mozscape-XXXXXXXXXX`)
   - **Secret Key** (es. `XXXXXXXXXXXXXXXXXXXXXXXXXX`)
6. **Salva entrambi in modo sicuro** — il Secret è mostrato UNA volta sola.

---

## STEP 2 — Configura le credenziali sul sistema (1 min)

Apri PowerShell e crea il file di config nel percorso atteso dalla skill SEO:

```powershell
$dir = "$env:USERPROFILE\.config\claude-seo"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$config = @{
    moz_access_id = "INSERISCI_ACCESS_ID_QUI"
    moz_api_key   = "INSERISCI_SECRET_KEY_QUI"
} | ConvertTo-Json
Set-Content -Path "$dir\backlinks-api.json" -Value $config -Encoding utf8
```

Verifica:
```powershell
python "$env:USERPROFILE\.claude\skills\seo\scripts\backlinks_auth.py" --check
```

Output atteso:
```
Backlink Tier: 1 — Standard (Moz + ...)
  [OK] Moz Link Explorer API
        2500 rows/month
  [OK] Common Crawl Web Graph
  ...
```

---

## STEP 3 — Quando l'hai fatto, dimmelo

Una volta che il check torna verde, dimmi "Moz pronto" e io eseguo subito:

### 3.1 Audit backlink baseline gdisrentservice.com
- Domain Authority (DA) del tuo dominio
- Page Authority (PA) homepage e top 5 pagine
- Lista completa **referring domains** con DA, anchor text, follow/nofollow
- **Toxic link detection** (spam score Moz)
- Anchor text distribution (over-optimization risk)

### 3.2 Competitor backlink gap analysis
Faccio audit dei top 4 competitor che oggi appaiono nel local pack per "noleggio auto olbia" — probabilmente:
- Sicilybycar.it
- Maggiore.it (pagina Olbia)
- Hertz.it (pagina Olbia)
- Locauto.it (pagina Olbia)
- + 1 locale concorrente (es. Sardinya Rent o Avis Olbia)

Per ognuno ottengo:
- DA + total backlinks
- Top 20 referring domains
- **Link gap**: domini che linkano i competitor ma NON te → la tua **outreach hit list**

### 3.3 Outreach target list filtrato
Output finale: una tabella di **30-50 referring domains qualificati** (DA ≥20, italiani/europei, tema tourism/automotive/Sardinia) con:
- URL contact page
- Email outreach (quando trovabile)
- Anchor text suggerito (LSI variants per ogni cluster query)
- Hit rate stimato (% likelihood che dicano sì)
- Effort score (basso/medio/alto)

Da lì decidiamo i primi 10 a cui mandare email questa settimana.

---

## STEP 4 — Bonus: anche Bing Webmaster (opzionale, +5 min)

Se vuoi anche backlink data di Bing (più completo di Common Crawl, gratis):

1. Vai su [bing.com/webmasters](https://www.bing.com/webmasters)
2. Aggiungi proprietà `gdisrentservice.com`
3. Verifica via DNS TXT record o file HTML upload (consigliato il primo)
4. Dopo verifica → Settings → API access → genera API key
5. Salva la API key nello stesso file:

```powershell
$cfg = Get-Content "$env:USERPROFILE\.config\claude-seo\backlinks-api.json" | ConvertFrom-Json
$cfg | Add-Member -NotePropertyName "bing_api_key" -NotePropertyValue "TUA_BING_KEY" -Force
$cfg | ConvertTo-Json | Set-Content "$env:USERPROFILE\.config\claude-seo\backlinks-api.json" -Encoding utf8
```

Bonus extra: con Bing Webmaster verificato, puoi anche configurare **IndexNow** (push automatico delle nuove URL a Bing/Yandex/Seznam per indicizzazione immediata).

---

## Limiti del free tier Moz

- **2500 query/mese** — 1 audit completo = ~50 query, 1 competitor audit = ~30 query. Suff. per ~30 audit/mese.
- **Reset il primo del mese** (fuso US Pacific).
- **No historic data backlinks** > 90 giorni. Per trend annuali serve piano paid ($99/mese minimo).
- **No daily fresh index**: dati aggiornati ~mensilmente.

Per noi adesso è sovrabbondante. Se il monitoring diventa serio (post-deploy + 3 mesi), valuteremo upgrade a Moz Pro o sostituzione con Ahrefs/Semrush (entrambi $99-129/mese, più completi).

---

## TL;DR

1. Registrati su [moz.com/community/join](https://moz.com/community/join) (kreafase1@gmail.com)
2. Crea API token su [moz.com/account/api](https://moz.com/account/api)
3. Esegui i 3 comandi PowerShell sopra
4. Lancia `python ~/.claude/skills/seo/scripts/backlinks_auth.py --check` → deve uscire `Tier: 1`
5. Scrivi "Moz pronto" qui e io faccio audit + competitor gap analysis live
