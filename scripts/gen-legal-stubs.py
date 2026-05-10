import re
from pathlib import Path

LEGAL = {
    'src/pages/privacy.astro': {
        'en': ('src/pages/en/privacy-policy.astro',
               'Privacy Policy — GDIS Rent & Service',
               'Privacy notice on the processing of personal data pursuant to EU Regulation 2016/679 (GDPR). Data controller: GDIS Service S.R.L., Olbia.',
               '/en/privacy-policy',
               '{ it: "/privacy", de: "/de/datenschutz", fr: "/fr/confidentialite" }',
               'Privacy Policy'),
        'de': ('src/pages/de/datenschutz.astro',
               'Datenschutzerklärung — GDIS Rent & Service',
               'Datenschutzhinweis zur Verarbeitung personenbezogener Daten gemäß EU-Verordnung 2016/679 (DSGVO). Verantwortlicher: GDIS Service S.R.L., Olbia.',
               '/de/datenschutz',
               '{ it: "/privacy", en: "/en/privacy-policy", fr: "/fr/confidentialite" }',
               'Datenschutz'),
        'fr': ('src/pages/fr/confidentialite.astro',
               'Politique de confidentialité — GDIS Rent & Service',
               'Avis sur le traitement des données personnelles conformément au Règlement UE 2016/679 (RGPD). Responsable du traitement : GDIS Service S.R.L., Olbia.',
               '/fr/confidentialite',
               '{ it: "/privacy", en: "/en/privacy-policy", de: "/de/datenschutz" }',
               'Confidentialité'),
    },
    'src/pages/cookie.astro': {
        'en': ('src/pages/en/cookie-policy.astro',
               'Cookie Policy — GDIS Rent & Service',
               'List of cookies used on gdisrentservice.com, purposes, duration and ways to manage or revoke consent.',
               '/en/cookie-policy',
               '{ it: "/cookie", de: "/de/cookie-richtlinie", fr: "/fr/cookies" }',
               'Cookie Policy'),
        'de': ('src/pages/de/cookie-richtlinie.astro',
               'Cookie-Richtlinie — GDIS Rent & Service',
               'Liste der auf gdisrentservice.com verwendeten Cookies, Zwecke, Dauer und Möglichkeiten zur Verwaltung oder zum Widerruf der Einwilligung.',
               '/de/cookie-richtlinie',
               '{ it: "/cookie", en: "/en/cookie-policy", fr: "/fr/cookies" }',
               'Cookie-Richtlinie'),
        'fr': ('src/pages/fr/cookies.astro',
               'Politique des cookies — GDIS Rent & Service',
               'Liste des cookies utilisés sur gdisrentservice.com, finalités, durée et moyens de gérer ou révoquer le consentement.',
               '/fr/cookies',
               '{ it: "/cookie", en: "/en/cookie-policy", de: "/de/cookie-richtlinie" }',
               'Cookies'),
    },
    'src/pages/termini.astro': {
        'en': ('src/pages/en/terms.astro',
               'Terms and Conditions of Rental — GDIS Rent & Service',
               'General terms of the car, scooter and quad rental service offered by GDIS Service S.R.L. in Olbia and Costa Smeralda.',
               '/en/terms',
               '{ it: "/termini", de: "/de/agb", fr: "/fr/conditions-generales" }',
               'Terms & Conditions'),
        'de': ('src/pages/de/agb.astro',
               'Allgemeine Geschäftsbedingungen — GDIS Rent & Service',
               'Allgemeine Bedingungen des Auto-, Roller- und Quad-Vermietungsdienstes von GDIS Service S.R.L. in Olbia und der Costa Smeralda.',
               '/de/agb',
               '{ it: "/termini", en: "/en/terms", fr: "/fr/conditions-generales" }',
               'AGB'),
        'fr': ('src/pages/fr/conditions-generales.astro',
               'Conditions générales de location — GDIS Rent & Service',
               'Conditions générales du service de location de voitures, scooters et quads proposé par GDIS Service S.R.L. à Olbia et en Costa Smeralda.',
               '/fr/conditions-generales',
               '{ it: "/termini", en: "/en/terms", de: "/de/agb" }',
               'Conditions générales'),
    },
}

home_label = {'en': 'Home', 'de': 'Home', 'fr': 'Accueil'}

for src, langs in LEGAL.items():
    src_text = Path(src).read_text(encoding='utf-8')
    for lang, (dest, title, desc, canonical, alternates, breadcrumb_label) in langs.items():
        out = src_text
        out = re.sub(r'(  title=)"[^"]*"', lambda m: m.group(1) + '"' + title.replace('"', '\\"') + '"', out, count=1)
        out = re.sub(r'(  description=)"[^"]*"', lambda m: m.group(1) + '"' + desc.replace('"', '\\"') + '"', out, count=1)
        out = re.sub(r'(  canonical=)"[^"]*"', f'\\1"{canonical}"', out, count=1)
        out = re.sub(
            r'i18nAlternates=\{\{[^}]*\}\}',
            f'i18nAlternates={{{alternates}}}',
            out, count=1, flags=re.DOTALL
        )
        out = re.sub(
            r'\{\s*name:\s*"Home",\s*url:\s*"/"\s*\}',
            f'{{ name: "{home_label[lang]}", url: "/{lang}" }}',
            out, count=1
        )
        out = re.sub(
            r'\{\s*name:\s*"(Privacy Policy|Cookie Policy|Termini e Condizioni)",\s*url:\s*"[^"]*"\s*\}',
            lambda m: '{ name: "' + breadcrumb_label + '", url: "' + canonical + '" }',
            out, count=1
        )
        Path(dest).parent.mkdir(parents=True, exist_ok=True)
        Path(dest).write_text(out, encoding='utf-8')
        print(f'Wrote {dest}')

print('Done legal')
