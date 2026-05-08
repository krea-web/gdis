import { defineCollection, z } from "astro:content";

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const spotCategory = z.enum([
  "spiaggia",
  "panorama",
  "monumento",
  "natura",
  "porto",
  "centro",
  "evento",
  "escursione",
]);

const spot = z.object({
  name: z.string(),
  category: spotCategory,
  description: z.string(),
  distance: z.string(),
  cost: z.string(),
  bestTime: z.string(),
});

const trafficTip = z.object({
  icon: z.enum(["ztl", "parking", "traffic", "tip"]),
  title: z.string(),
  text: z.string(),
});

const nightlifeItem = z.object({
  name: z.string(),
  type: z.enum(["ristorante", "aperitivo", "club", "lounge"]),
  desc: z.string(),
});

const customSection = z.object({
  variant: z.enum(["airport", "port", "left-image", "right-image"]).default("right-image"),
  badge: z.string().optional(),
  title: z.string(),
  body: z.string(),
  bullets: z.array(z.string()).optional(),
  callout: z
    .object({
      title: z.string(),
      text: z.string(),
    })
    .optional(),
  image: z.string().url(),
  imageAlt: z.string(),
});

const cockpitSpec = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.enum(["license", "seats", "use", "delivery"]),
});

const locations = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    canonical: z.string(),
    heroImage: z.string().url(),
    heroSubtitle: z.string(),
    heroAccent: z.string().optional(),
    /** "Noleggio Auto a" | "Noleggio Auto in" — defaults to "Noleggio Auto a". */
    h1Prefix: z.string().optional(),
    areaServed: z.array(
      z.object({
        type: z.string(),
        name: z.string(),
      }),
    ),
    customSections: z.array(customSection).default([]),
    spotlight: z
      .object({
        tag: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().url(),
        imageAlt: z.string().optional(),
        badges: z.array(z.string()).default([]),
      })
      .optional(),
    topSpots: z.array(spot),
    cockpit: z
      .object({
        vehicleName: z.string(),
        specs: z.array(cockpitSpec),
      })
      .optional(),
    comparison: z
      .object({
        title: z.string().optional(),
        subtitle: z.string().optional(),
        show: z.array(z.enum(["panda", "mercedes", "honda", "yamaha"])).default(["panda", "mercedes", "honda", "yamaha"]),
        recommendation: z.string().optional(),
      })
      .optional(),
    trafficTips: z.array(trafficTip),
    nightlife: z.array(nightlifeItem),
    trustMarqueeItems: z.array(z.string()).optional(),
    faq: z.array(faqItem),
    closingParagraph: z.string().optional(),
  }),
});

const specIcon = z.enum(["gauge", "fuel", "users", "settings", "wind", "luggage", "shield", "mountain", "wrench"]);
const scenarioIcon = z.enum(["map-pin", "shopping-bag", "users", "parking", "bike", "zap", "mountain", "flame", "camera", "star"]);

const featureSection = z.object({
  label: z.string(),
  title: z.string(),
  body: z.array(z.string()),
  image: z.string().url(),
  imageAlt: z.string(),
  /** When true, image goes left and text goes right (default: image on right) */
  reverse: z.boolean().default(false),
});

const fleet = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    category: z.enum(["auto", "scooter", "quad"]),
    title: z.string(),
    description: z.string(),
    canonical: z.string(),
    heroImage: z.string().url(),
    heroLabel: z.string(),
    heroH1Top: z.string(),
    heroH1Bottom: z.string(),
    heroSubtitle: z.string(),
    heroBadges: z.array(z.string()),
    featureSections: z.array(featureSection),
    specs: z.array(
      z.object({
        icon: specIcon,
        label: z.string(),
        value: z.string(),
      }),
    ),
    scenarios: z.array(
      z.object({
        icon: scenarioIcon,
        title: z.string(),
        description: z.string(),
        highlight: z.boolean().default(false),
      }),
    ),
    whySection: z.object({
      label: z.string(),
      title: z.string(),
      paragraphs: z.array(z.string()),
    }),
    localitaSection: z.object({
      label: z.string(),
      title: z.string(),
      intro: z.string(),
      items: z.array(z.string()),
      outro: z.string(),
    }),
    faq: z.array(faqItem),
    ctaTitle: z.string(),
    ctaSubtitle: z.string(),
    ctaButtonLabel: z.string(),
    pricePerDay: z.number(),
    priceValidUntil: z.string(),
    /** Schema.org type: Car, Motorcycle, or Product. Default: Product */
    jsonLdType: z.enum(["Car", "Motorcycle", "Product"]).default("Product"),
    jsonLdBrand: z.string(),
    jsonLdManufacturer: z.string(),
    jsonLdModel: z.string(),
    jsonLdExtras: z.record(z.any()).default({}),
  }),
});

const arrivals = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    kind: z.enum(["airport", "port", "station"]),
    title: z.string(),
    description: z.string(),
    heroImage: z.string().url(),
    heroSubtitle: z.string(),
    bodyHtml: z.string(),
    faq: z.array(faqItem),
  }),
});

export const collections = { locations, fleet, arrivals };
