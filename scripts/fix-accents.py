import re
from pathlib import Path

# Map of placeholder strings -> proper Unicode equivalents
FIXES = {
    # German
    "Datenschutzerklaerung": "Datenschutzerklärung",
    "gemaess": "gemäß",
    "Verantwortlicher": "Verantwortlicher",
    "Faehrterminal": "Fährterminal",
    "Flugueberwachung": "Flugüberwachung",
    "fuer": "für",
    "Geschaeftsbedingungen": "Geschäftsbedingungen",
    "Moeglichkeiten": "Möglichkeiten",
    "Zwecke": "Zwecke",
    "Nizza": "Nizza",
    "Maerz": "März",

    # French
    "Aeroport": "Aéroport",
    "aeroport": "aéroport",
    "Arrivees": "Arrivées",
    "arrivees": "arrivées",
    "Reservez": "Réservez",
    "reservez": "réservez",
    "reels": "réels",
    "reel": "réel",
    "evenement": "événement",
    "Evenement": "Événement",
    "Debarquement": "Débarquement",
    "debarquement": "débarquement",
    "ferries": "ferries",
    "Genes": "Gênes",
    "Livourne": "Livourne",
    "Reglement": "Règlement",
    "Responsable": "Responsable",
    "donnees": "données",
    "Donnees": "Données",
    "personnelles": "personnelles",
    "conformement": "conformément",
    "duree": "durée",
    "finalites": "finalités",
    "Finalites": "Finalités",
    "revoquer": "révoquer",
    "gerer": "gérer",
    "utilises": "utilisés",
    "Politique de confidentialite": "Politique de confidentialité",
    "confidentialite": "confidentialité",
    "Confidentialite": "Confidentialité",
    "generales": "générales",
    "Generales": "Générales",
    "propose": "proposé",
    "Conditions generales": "Conditions générales",
    "a Olbia": "à Olbia",
    "a Porto Cervo": "à Porto Cervo",
    "a Baja Sardinia": "à Baja Sardinia",
    "a San Teodoro": "à San Teodoro",
    "Liaisons": "Liaisons",
    "depuis": "depuis",
    "sortie": "sortie",
    "Reservation": "Réservation",
    "Numerique": "Numérique",
    "numerique": "numérique",
    "voitures, scooters et quads propose": "voitures, scooters et quads proposé",
    "Aeroport Olbia": "Aéroport Olbia",
    "Gare d Olbia": "Gare d'Olbia",
    "Port d Olbia": "Port d'Olbia",
}

# Apply fixes only to the 21 stub pages I just created
STUB_FILES = [
    "src/pages/en/car-rental-olbia-airport.astro",
    "src/pages/en/car-rental-olbia-port.astro",
    "src/pages/en/car-rental-olbia-station.astro",
    "src/pages/en/car-rental-costa-smeralda.astro",
    "src/pages/en/privacy-policy.astro",
    "src/pages/en/cookie-policy.astro",
    "src/pages/en/terms.astro",
    "src/pages/de/autovermietung-flughafen-olbia.astro",
    "src/pages/de/autovermietung-hafen-olbia.astro",
    "src/pages/de/autovermietung-bahnhof-olbia.astro",
    "src/pages/de/autovermietung-costa-smeralda.astro",
    "src/pages/de/datenschutz.astro",
    "src/pages/de/cookie-richtlinie.astro",
    "src/pages/de/agb.astro",
    "src/pages/fr/location-voiture-aeroport-olbia.astro",
    "src/pages/fr/location-voiture-port-olbia.astro",
    "src/pages/fr/location-voiture-gare-olbia.astro",
    "src/pages/fr/location-voiture-costa-smeralda.astro",
    "src/pages/fr/confidentialite.astro",
    "src/pages/fr/cookies.astro",
    "src/pages/fr/conditions-generales.astro",
]

for path in STUB_FILES:
    p = Path(path)
    if not p.exists():
        print(f"SKIP missing {path}")
        continue
    text = p.read_text(encoding='utf-8')
    # Only apply fixes within the BaseLayout title= and description= attributes (lines 9-12)
    # Simple find/replace on the first 25 lines (frontmatter + opening BaseLayout)
    lines = text.split('\n')
    head = '\n'.join(lines[:25])
    rest = '\n'.join(lines[25:])
    for bad, good in FIXES.items():
        head = head.replace(bad, good)
    p.write_text(head + '\n' + rest, encoding='utf-8')
    print(f"fixed {path}")

print("done")
