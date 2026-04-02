import { useEffect, useRef } from "react";
import gsap from "gsap";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import { formatCurrency } from "../utils/formatCurrency";
import { getFallbackImage } from "../utils/imageFallback";

const Product = ({ post, index, theme }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return undefined;

    const handleEnter = () => {
      gsap.to(card, {
        y: -10,
        boxShadow: theme === "dark" ? "0 28px 70px -32px rgba(34, 211, 238, 0.28)" : "0 28px 70px -32px rgba(14, 116, 144, 0.55)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(image, { scale: 1.08, rotation: 2, duration: 0.45, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: theme === "dark" ? "0 20px 50px -35px rgba(2, 6, 23, 0.82)" : "0 20px 50px -35px rgba(15, 23, 42, 0.45)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(image, { scale: 1, rotation: 0, duration: 0.45, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, [theme]);

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };

  return (
    <article ref={cardRef} data-product-card data-index={index} className="group flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 shadow-[var(--card-shadow)] backdrop-blur transition-colors duration-500">
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-[var(--chip-bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--chip-text)] transition-colors duration-500">{post.category}</span>
          <span className="rounded-full bg-[var(--rating-bg)] px-3 py-1 text-xs font-bold text-[var(--rating-text)] transition-colors duration-500">{post.rating?.rate ?? "4.0"} / 5</span>
        </div>

        <p className="mt-4 min-h-14 text-lg font-bold leading-6 text-[var(--text-main)] md:min-h-16">{post.title}</p>
        <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{post.description.split(" ").slice(0, 16).join(" ")}...</p>
      </div>

      <div className="my-6 flex h-44 items-center justify-center rounded-[1.5rem] bg-[var(--product-image-bg)] p-4 transition-colors duration-500 sm:h-52 sm:p-5 lg:h-56 lg:p-6">
        <img
          ref={imageRef}
          src={post.image}
          alt={post.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = getFallbackImage(post.title, post.category);
          }}
          className="h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.18)]"
        />
      </div>

      <div className="mt-auto flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-2xl font-black text-[var(--price-text)]">{formatCurrency(post.price)}</p>
        {cart.some((p) => p.id === post.id) ? (
          <button className="w-full rounded-full border border-[var(--button-outline-border)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--button-outline-text)] transition duration-300 hover:bg-[var(--button-outline-hover-bg)] hover:text-[var(--button-outline-hover-text)] sm:w-auto" onClick={removeFromCart}>
            Remove
          </button>
        ) : (
          <button className="w-full rounded-full bg-[var(--button-solid-bg)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--button-solid-text)] transition duration-300 hover:bg-[var(--button-solid-hover-bg)] hover:text-[var(--button-solid-hover-text)] sm:w-auto" onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};

export default Product;
