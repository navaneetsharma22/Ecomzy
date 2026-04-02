import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { formatCurrency } from "../utils/formatCurrency";
import { getFallbackImage } from "../utils/imageFallback";

const FeaturedPreview = ({ products }) => {
  const featuredProducts = useMemo(() => products.slice(0, 5), [products]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (featuredProducts.length <= 1) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % featuredProducts.length);
    }, 3200);
    return () => window.clearInterval(intervalId);
  }, [featuredProducts]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-preview-badge], [data-preview-title], [data-preview-copy], [data-preview-meta], [data-preview-image], [data-preview-dots]",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.08, clearProps: "all" }
      );
    }, sliderRef);
    return () => ctx.revert();
  }, [activeIndex]);

  if (featuredProducts.length === 0) return null;

  const activeProduct = featuredProducts[activeIndex];

  return (
    <section ref={sliderRef} className="mt-8 overflow-hidden rounded-[2rem] border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-[var(--surface-shadow)] transition-colors duration-500">
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div className="flex flex-col justify-between">
          <div>
            <p data-preview-badge className="inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[var(--badge-text)]">
              New product preview
            </p>
            <h2 data-preview-title className="mt-5 max-w-xl text-3xl font-black leading-tight text-[var(--text-main)] md:text-5xl">
              Fresh arrivals, previewed one by one.
            </h2>
            <p data-preview-copy className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)] md:text-base">
              A focused spotlight on our newest drops before you dive into the full collection.
            </p>
          </div>

          <div data-preview-meta className="mt-8 rounded-[1.5rem] bg-[var(--product-image-bg)] p-5 transition-colors duration-500">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-[var(--chip-bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--chip-text)]">{activeProduct.category}</span>
              <span className="rounded-full bg-[var(--rating-bg)] px-3 py-1 text-xs font-bold text-[var(--rating-text)]">{activeProduct.rating.rate} / 5</span>
            </div>
            <h3 className="mt-5 text-2xl font-black text-[var(--text-main)]">{activeProduct.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{activeProduct.description}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-2xl font-black text-[var(--price-text)]">{formatCurrency(activeProduct.price)}</p>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-muted)]">{activeProduct.rating.count}+ reviews</p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[280px] items-center justify-center rounded-[1.75rem] bg-[var(--slider-shell-bg)] p-4 transition-colors duration-500 sm:min-h-[320px] sm:p-5 md:min-h-[360px]">
          <div className="absolute inset-0 bg-[var(--slider-shell-glow)]" />
          <div data-preview-image className="relative z-10 flex h-full w-full items-center justify-center">
            <img
              src={activeProduct.image}
              alt={activeProduct.title}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getFallbackImage(activeProduct.title, activeProduct.category);
              }}
              className="h-[240px] w-full rounded-[1.5rem] object-cover shadow-[0_30px_60px_-35px_rgba(15,23,42,0.6)] sm:h-[280px] md:h-[320px]"
            />
          </div>
          <div data-preview-dots className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[var(--slider-dots-bg)] px-3 py-2 backdrop-blur">
            {featuredProducts.map((product, index) => (
              <button
                key={product.id}
                type="button"
                aria-label={`Show preview for ${product.title}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 bg-[var(--accent)]" : "w-2.5 bg-[var(--slider-dot-idle)]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPreview;
