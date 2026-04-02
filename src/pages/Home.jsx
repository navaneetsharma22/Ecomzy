import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import FeaturedPreview from "../components/FeaturedPreview";
import { products as catalogProducts } from "../data";

const Home = ({ theme }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const pageRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPosts(catalogProducts);
      setLoading(false);
    }, 450);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-badge], [data-hero-title], [data-hero-copy], [data-hero-metrics]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        }
      );

      gsap.fromTo(
        "[data-product-card]",
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [loading, posts]);

  return (
    <div ref={pageRef} className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--surface-border)] bg-[var(--surface-hero)] px-5 py-8 shadow-[var(--surface-shadow)] backdrop-blur sm:px-6 md:px-10 md:py-10 transition-colors duration-500">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[var(--hero-glow)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p data-hero-badge className="inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[var(--badge-text)]">
              Curated arrivals
            </p>
            <h1 data-hero-title className="mt-5 max-w-xl text-3xl font-black leading-tight text-[var(--text-hero)] sm:text-4xl md:text-6xl">
              Smart picks with a faster, animated shopping flow.
            </h1>
            <p data-hero-copy className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)] md:text-base">
              Browse standout products, scan prices quickly, and build your cart
              with motion that feels polished instead of distracting.
            </p>
          </div>

          <div data-hero-metrics className="grid w-full max-w-md grid-cols-3 gap-3">
            <div className="rounded-3xl bg-[var(--metric-primary-bg)] p-4 text-[var(--metric-primary-text)] transition-colors duration-500">
              <p className="text-2xl font-black">{posts.length || "20"}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--metric-primary-muted)]">Products</p>
            </div>
            <div className="rounded-3xl bg-[var(--accent)] p-4 text-[var(--accent-contrast)] transition-colors duration-500">
              <p className="text-2xl font-black">4.8</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--metric-accent-muted)]">Average rating</p>
            </div>
            <div className="rounded-3xl bg-[var(--metric-soft-bg)] p-4 text-[var(--metric-soft-text)] transition-colors duration-500">
              <p className="text-2xl font-black">24h</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--metric-soft-muted)]">Fresh deals</p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Spinner />
        </div>
      ) : posts.length > 0 ? (
        <>
          <FeaturedPreview products={posts} />
          <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {posts.map((post, index) => (
              <Product key={post.id} post={post} index={index} theme={theme} />
            ))}
          </section>
        </>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-[2rem] border border-dashed border-[var(--surface-border)] bg-[var(--surface-card)] text-center transition-colors duration-500">
          <p className="text-2xl font-bold text-[var(--text-main)]">No products found</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">The catalog could not be loaded right now.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
