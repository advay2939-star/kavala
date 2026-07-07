import { home } from "@/lib/content/home";

/**
 * Honest empty state until real verified reviews exist.
 * No seeded testimonials — ever. AggregateRating schema is likewise
 * emitted only from approved verified rows (see lib/compliance).
 */
export function ReviewsBlock({ reviewCount = 0 }: { reviewCount?: number }) {
  const { reviews } = home;
  if (reviewCount === 0) {
    return (
      <section className="border-y border-bone/10 bg-lacquer-soft">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="type-label mb-6">{reviews.eyebrow}</p>
          <p className="text-[15px] leading-relaxed text-bone-dim">{reviews.emptyState}</p>
        </div>
      </section>
    );
  }
  // Verified review rendering lands with the reviews API in Chunk 5.
  return null;
}
