import { home } from "@/lib/content/home";
import { products } from "@/lib/commerce/products";
import { ProductCard } from "@/components/marketing/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function ObjectsLadder() {
  const { objects } = home;
  return (
    <section className="border-y border-bone/10 bg-lacquer">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="type-label mb-6">{objects.eyebrow}</p>
        <Reveal>
          <h2 className="type-display max-w-3xl text-4xl text-bone md:text-5xl">{objects.headline}</h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
