import { Helmet } from "react-helmet-async";

type JsonLd = Record<string, unknown>;

type BreadcrumbItem = { name: string; url: string };

type Props = {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: JsonLd | JsonLd[];
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: "website" | "article" | "product";
  ogLocale?: string;
  robots?: string;
  breadcrumbs?: BreadcrumbItem[];
  keywords?: string;
};

const SITE_URL = "https://gdisrentservice.com";
const DEFAULT_OG_IMAGE =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";

const SEOHead = ({
  title,
  description,
  canonical,
  jsonLd,
  ogImage,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = "website",
  ogLocale = "it_IT",
  robots = "index,follow,max-image-preview:large,max-snippet:-1",
  breadcrumbs,
  keywords,
}: Props) => {
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : undefined;
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;
  const schemas: JsonLd[] = Array.isArray(jsonLd) ? [...jsonLd] : jsonLd ? [jsonLd] : [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url}`,
      })),
    });
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content="GDIS Service S.R.L." />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:site_name" content="GDIS Rent & Service" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {schemas.map((s, i) => (
        <script key={`jsonld-${i}`} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
