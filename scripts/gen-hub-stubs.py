import re
from pathlib import Path

HUBS = {
    'src/pages/noleggio-auto-aeroporto-olbia.astro': {
        'en': ('src/pages/en/car-rental-olbia-airport.astro',
               'Car Rental Olbia Airport OLB | Arrivals Delivery | GDIS Rent',
               'Car rental Olbia Costa Smeralda Airport OLB. VIP delivery directly at arrivals, flight tracking, real distances and times to Costa Smeralda. Book online 24/7.',
               '/en/car-rental-olbia-airport',
               '{ it: "/noleggio-auto-aeroporto-olbia", de: "/de/autovermietung-flughafen-olbia", fr: "/fr/location-voiture-aeroport-olbia" }'),
        'de': ('src/pages/de/autovermietung-flughafen-olbia.astro',
               'Autovermietung Flughafen Olbia OLB | Lieferung am Ankunftsterminal | GDIS Rent',
               'Autovermietung Flughafen Olbia Costa Smeralda OLB. VIP-Lieferung direkt am Ankunftsterminal, Flugüberwachung, reale Distanzen und Zeiten zur Costa Smeralda. Online buchen 24/7.',
               '/de/autovermietung-flughafen-olbia',
               '{ it: "/noleggio-auto-aeroporto-olbia", en: "/en/car-rental-olbia-airport", fr: "/fr/location-voiture-aeroport-olbia" }'),
        'fr': ('src/pages/fr/location-voiture-aeroport-olbia.astro',
               'Location Voiture Aéroport Olbia OLB | Livraison aux Arrivées | GDIS Rent',
               'Location voiture aéroport Olbia Costa Smeralda OLB. Livraison VIP directement aux arrivées, suivi des vols, distances et temps réels vers la Costa Smeralda. Réservez en ligne 24/7.',
               '/fr/location-voiture-aeroport-olbia',
               '{ it: "/noleggio-auto-aeroporto-olbia", en: "/en/car-rental-olbia-airport", de: "/de/autovermietung-flughafen-olbia" }'),
    },
    'src/pages/noleggio-auto-porto-olbia.astro': {
        'en': ('src/pages/en/car-rental-olbia-port.astro',
               'Car Rental Olbia Port Isola Bianca | Tirrenia Moby GNV | GDIS Rent',
               'Car rental Olbia Port Isola Bianca. Disembarking from Civitavecchia, Livorno, Genoa, Piombino, Nice. Delivery at the ferry terminal. WhatsApp 24/7.',
               '/en/car-rental-olbia-port',
               '{ it: "/noleggio-auto-porto-olbia", de: "/de/autovermietung-hafen-olbia", fr: "/fr/location-voiture-port-olbia" }'),
        'de': ('src/pages/de/autovermietung-hafen-olbia.astro',
               'Autovermietung Hafen Olbia Isola Bianca | Tirrenia Moby GNV | GDIS Rent',
               'Autovermietung Hafen Olbia Isola Bianca. Anlandung von Civitavecchia, Livorno, Genua, Piombino, Nizza. Lieferung am Fährterminal. WhatsApp 24/7.',
               '/de/autovermietung-hafen-olbia',
               '{ it: "/noleggio-auto-porto-olbia", en: "/en/car-rental-olbia-port", fr: "/fr/location-voiture-port-olbia" }'),
        'fr': ('src/pages/fr/location-voiture-port-olbia.astro',
               "Location Voiture Port d'Olbia Isola Bianca | Tirrenia Moby GNV | GDIS Rent",
               "Location voiture port d'Olbia Isola Bianca. Débarquement de Civitavecchia, Livourne, Gênes, Piombino, Nice. Livraison au terminal des ferries. WhatsApp 24/7.",
               '/fr/location-voiture-port-olbia',
               '{ it: "/noleggio-auto-porto-olbia", en: "/en/car-rental-olbia-port", de: "/de/autovermietung-hafen-olbia" }'),
    },
    'src/pages/noleggio-auto-stazione-olbia.astro': {
        'en': ('src/pages/en/car-rental-olbia-station.astro',
               'Car Rental Olbia Station | Combine Train + Car | GDIS Rent',
               'Car rental Olbia Station. Trenitalia connections from Sassari and Cagliari. Combo train + car for Costa Smeralda. Delivery at the exit. WhatsApp 24/7.',
               '/en/car-rental-olbia-station',
               '{ it: "/noleggio-auto-stazione-olbia", de: "/de/autovermietung-bahnhof-olbia", fr: "/fr/location-voiture-gare-olbia" }'),
        'de': ('src/pages/de/autovermietung-bahnhof-olbia.astro',
               'Autovermietung Bahnhof Olbia | Zug + Auto kombinieren | GDIS Rent',
               'Autovermietung Bahnhof Olbia. Trenitalia-Verbindungen aus Sassari und Cagliari. Zug-Auto-Kombi für die Costa Smeralda. Lieferung am Ausgang. WhatsApp 24/7.',
               '/de/autovermietung-bahnhof-olbia',
               '{ it: "/noleggio-auto-stazione-olbia", en: "/en/car-rental-olbia-station", fr: "/fr/location-voiture-gare-olbia" }'),
        'fr': ('src/pages/fr/location-voiture-gare-olbia.astro',
               "Location Voiture Gare d'Olbia | Combiner Train + Voiture | GDIS Rent",
               "Location voiture gare d'Olbia. Liaisons Trenitalia depuis Sassari et Cagliari. Combo train + voiture pour la Costa Smeralda. Livraison à la sortie. WhatsApp 24/7.",
               '/fr/location-voiture-gare-olbia',
               '{ it: "/noleggio-auto-stazione-olbia", en: "/en/car-rental-olbia-station", de: "/de/autovermietung-bahnhof-olbia" }'),
    },
    'src/pages/noleggio-auto-in-costa-smeralda.astro': {
        'en': ('src/pages/en/car-rental-costa-smeralda.astro',
               'Car Rental Costa Smeralda | VIP Delivery Porto Cervo | GDIS Rent',
               'Car rental Costa Smeralda. VIP delivery to Porto Cervo, Baja Sardinia, San Teodoro, Olbia. Cars, scooters, quads. Book on WhatsApp 24/7 with digital signature.',
               '/en/car-rental-costa-smeralda',
               '{ it: "/noleggio-auto-in-costa-smeralda", de: "/de/autovermietung-costa-smeralda", fr: "/fr/location-voiture-costa-smeralda" }'),
        'de': ('src/pages/de/autovermietung-costa-smeralda.astro',
               'Autovermietung Costa Smeralda | VIP-Lieferung Porto Cervo | GDIS Rent',
               'Autovermietung Costa Smeralda. VIP-Lieferung in Porto Cervo, Baja Sardinia, San Teodoro, Olbia. Auto, Roller, Quad. Auf WhatsApp 24/7 buchen mit digitaler Unterschrift.',
               '/de/autovermietung-costa-smeralda',
               '{ it: "/noleggio-auto-in-costa-smeralda", en: "/en/car-rental-costa-smeralda", fr: "/fr/location-voiture-costa-smeralda" }'),
        'fr': ('src/pages/fr/location-voiture-costa-smeralda.astro',
               'Location Voiture Costa Smeralda | Livraison VIP Porto Cervo | GDIS Rent',
               'Location voiture Costa Smeralda. Livraison VIP à Porto Cervo, Baja Sardinia, San Teodoro, Olbia. Voitures, scooters, quads. Réservez sur WhatsApp 24/7 avec signature numérique.',
               '/fr/location-voiture-costa-smeralda',
               '{ it: "/noleggio-auto-in-costa-smeralda", en: "/en/car-rental-costa-smeralda", de: "/de/autovermietung-costa-smeralda" }'),
    },
}

home_label = {'en': 'Home', 'de': 'Home', 'fr': 'Accueil'}

for src, langs in HUBS.items():
    src_text = Path(src).read_text(encoding='utf-8')
    for lang, (dest, title, desc, canonical, alternates) in langs.items():
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
        Path(dest).parent.mkdir(parents=True, exist_ok=True)
        Path(dest).write_text(out, encoding='utf-8')
        print(f'Wrote {dest}')

print('Done hubs')
