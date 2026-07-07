import { Hero } from "@/components/marketing/Hero";
import { TheMinute } from "@/components/marketing/TheMinute";
import { FormulaTriptych } from "@/components/marketing/FormulaTriptych";
import { HonestyBlock } from "@/components/marketing/HonestyBlock";
import { ObjectsLadder } from "@/components/marketing/ObjectsLadder";
import { RitualNotReplacement } from "@/components/marketing/RitualNotReplacement";
import { ReviewsBlock } from "@/components/marketing/ReviewsBlock";
import { SubscribeStrip } from "@/components/marketing/SubscribeStrip";
import { Meniscus } from "@/components/ui/Meniscus";
import { products } from "@/lib/commerce/products";

/**
 * Organization + Product structured data. AggregateRating is
 * deliberately absent until real verified reviews exist.
 */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Kavala",
        url: "https://kavala.example.com",
      },
      ...products.map((p) => ({
        "@type": "Product",
        name: `Kavala ${p.name}`,
        description: p.shortCopy,
        sku: p.sku,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: p.priceUsd,
          availability: "https://schema.org/PreOrder",
        },
      })),
    ],
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      <Hero />
      <Meniscus className="mx-auto max-w-6xl opacity-70" />
      <TheMinute />
      <FormulaTriptych />
      <HonestyBlock />
      <ObjectsLadder />
      <RitualNotReplacement />
      <ReviewsBlock reviewCount={0} />
      <SubscribeStrip />
    </>
  );
}
