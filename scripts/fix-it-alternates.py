"""Restore the `it:` key inside i18nAlternates blocks of EN/DE/FR pages.
The bulk-link rewrite accidentally rewrote `it: "/noleggio-auto-..."` to its
locale equivalent. Map back."""
import re
from pathlib import Path

back_to_it = {
    # EN -> IT
    '/en/fleet/fiat-panda': '/flotta/fiat-panda',
    '/en/fleet/honda-sh': '/flotta/honda-sh',
    '/en/fleet/mercedes-classe-a180d': '/flotta/mercedes-classe-a180d',
    '/en/fleet/yamaha-raptor': '/flotta/yamaha-raptor',
    '/en/car-rental-in-olbia': '/noleggio-auto-a-olbia',
    '/en/car-rental-in-porto-cervo': '/noleggio-auto-a-porto-cervo',
    '/en/car-rental-in-san-teodoro': '/noleggio-auto-a-san-teodoro',
    '/en/car-rental-in-san-pantaleo': '/noleggio-auto-a-san-pantaleo',
    '/en/car-rental-in-porto-rotondo': '/noleggio-auto-a-porto-rotondo',
    '/en/car-rental-in-baja-sardinia': '/noleggio-auto-a-baja-sardinia',
    '/en/car-rental-in-golfo-aranci': '/noleggio-auto-a-golfo-aranci',
    '/en/car-rental-olbia-airport': '/noleggio-auto-aeroporto-olbia',
    '/en/car-rental-olbia-port': '/noleggio-auto-porto-olbia',
    '/en/car-rental-olbia-station': '/noleggio-auto-stazione-olbia',
    '/en/car-rental-costa-smeralda': '/noleggio-auto-in-costa-smeralda',
    '/en/book-now': '/prenotaora',
    '/en/contact': '/contatti',
    '/en/about-us': '/chisiamo',
    '/en/sitemap': '/mappa-sito',
    '/en/privacy-policy': '/privacy',
    '/en/cookie-policy': '/cookie',
    '/en/terms': '/termini',
    # DE -> IT
    '/de/flotte/fiat-panda': '/flotta/fiat-panda',
    '/de/flotte/honda-sh': '/flotta/honda-sh',
    '/de/flotte/mercedes-classe-a180d': '/flotta/mercedes-classe-a180d',
    '/de/flotte/yamaha-raptor': '/flotta/yamaha-raptor',
    '/de/autovermietung-olbia': '/noleggio-auto-a-olbia',
    '/de/autovermietung-porto-cervo': '/noleggio-auto-a-porto-cervo',
    '/de/autovermietung-san-teodoro': '/noleggio-auto-a-san-teodoro',
    '/de/autovermietung-san-pantaleo': '/noleggio-auto-a-san-pantaleo',
    '/de/autovermietung-porto-rotondo': '/noleggio-auto-a-porto-rotondo',
    '/de/autovermietung-baja-sardinia': '/noleggio-auto-a-baja-sardinia',
    '/de/autovermietung-golfo-aranci': '/noleggio-auto-a-golfo-aranci',
    '/de/autovermietung-flughafen-olbia': '/noleggio-auto-aeroporto-olbia',
    '/de/autovermietung-hafen-olbia': '/noleggio-auto-porto-olbia',
    '/de/autovermietung-bahnhof-olbia': '/noleggio-auto-stazione-olbia',
    '/de/autovermietung-costa-smeralda': '/noleggio-auto-in-costa-smeralda',
    '/de/jetzt-buchen': '/prenotaora',
    '/de/kontakt': '/contatti',
    '/de/ueber-uns': '/chisiamo',
    '/de/sitemap': '/mappa-sito',
    '/de/datenschutz': '/privacy',
    '/de/cookie-richtlinie': '/cookie',
    '/de/agb': '/termini',
    # FR -> IT
    '/fr/flotte/fiat-panda': '/flotta/fiat-panda',
    '/fr/flotte/honda-sh': '/flotta/honda-sh',
    '/fr/flotte/mercedes-classe-a180d': '/flotta/mercedes-classe-a180d',
    '/fr/flotte/yamaha-raptor': '/flotta/yamaha-raptor',
    '/fr/location-voiture-a-olbia': '/noleggio-auto-a-olbia',
    '/fr/location-voiture-a-porto-cervo': '/noleggio-auto-a-porto-cervo',
    '/fr/location-voiture-a-san-teodoro': '/noleggio-auto-a-san-teodoro',
    '/fr/location-voiture-a-san-pantaleo': '/noleggio-auto-a-san-pantaleo',
    '/fr/location-voiture-a-porto-rotondo': '/noleggio-auto-a-porto-rotondo',
    '/fr/location-voiture-a-baja-sardinia': '/noleggio-auto-a-baja-sardinia',
    '/fr/location-voiture-a-golfo-aranci': '/noleggio-auto-a-golfo-aranci',
    '/fr/location-voiture-aeroport-olbia': '/noleggio-auto-aeroporto-olbia',
    '/fr/location-voiture-port-olbia': '/noleggio-auto-porto-olbia',
    '/fr/location-voiture-gare-olbia': '/noleggio-auto-stazione-olbia',
    '/fr/location-voiture-costa-smeralda': '/noleggio-auto-in-costa-smeralda',
    '/fr/reserver': '/prenotaora',
    '/fr/contact': '/contatti',
    '/fr/a-propos': '/chisiamo',
    '/fr/plan-du-site': '/mappa-sito',
    '/fr/confidentialite': '/privacy',
    '/fr/cookies': '/cookie',
    '/fr/conditions-generales': '/termini',
}

fixed = 0
for f in Path('src/pages').rglob('*.astro'):
    s = str(f).replace('\\', '/')
    if not ('/en/' in s or '/de/' in s or '/fr/' in s):
        continue
    text = f.read_text(encoding='utf-8')
    original = text
    def fix_it_field(match):
        url = match.group(1)
        new_url = back_to_it.get(url, url)
        return f'it: "{new_url}"'
    text = re.sub(r'it:\s*"(/(?:en|de|fr)/[^"]+)"', fix_it_field, text)
    if text != original:
        f.write_text(text, encoding='utf-8')
        fixed += 1
print(f'fixed {fixed} files')
