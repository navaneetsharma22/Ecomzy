import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { formatCurrency } from "../utils/formatCurrency";

const Cart = ({ theme }) => {
  const cart = useSelector((state) => state.cart);
  const totalAmount = useMemo(() => cart.reduce((acc, curr) => acc + curr.price, 0), [cart]);

  return (
    <div className="mx-auto min-h-[calc(100vh-5rem)] max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {cart.length > 0 ? (
        <div className="flex flex-col gap-8 py-4 lg:flex-row lg:gap-12">
          <div className="flex-1">
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--text-muted)]">Bag overview</p>
              <h1 className="mt-2 text-3xl font-black text-[var(--text-main)]">Your selected products</h1>
            </div>
            <div className="flex flex-col gap-5">
              {cart.map((item) => <CartItem key={item.id} item={item} theme={theme} />)}
            </div>
          </div>

          <div className="w-full lg:max-w-sm">
            <div className="sticky top-28 rounded-[1.75rem] border border-[var(--summary-border)] bg-[var(--summary-bg)] p-6 text-[var(--summary-text)] shadow-[var(--summary-shadow)] transition-colors duration-500">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--summary-accent)]">Your Cart</div>
              <div className="mt-2 text-3xl font-black">Summary</div>
              <p className="mt-5 text-[var(--summary-muted)]"><span className="font-medium">Total Items: {cart.length}</span></p>
              <div className="mt-8 border-t border-[var(--summary-divider)] pt-6">
                <p className="text-lg text-[var(--summary-muted)]">
                  Total Amount: <span className="font-bold text-cyan-300">{formatCurrency(totalAmount)}</span>
                </p>
                <button className="mt-5 w-full rounded-full bg-[var(--accent)] py-3 font-bold text-[var(--accent-contrast)] transition duration-300 hover:brightness-110">
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 rounded-[2rem] border border-dashed border-[var(--surface-border)] bg-[var(--surface-card)] text-center transition-colors duration-500">
          <h1 className="text-3xl font-black text-[var(--text-main)]">Your cart is empty</h1>
          <p className="max-w-md text-sm leading-6 text-[var(--text-muted)]">Add a few pieces from the catalog and they will show up here with a live summary.</p>
          <Link to="/">
            <button className="rounded-full bg-[var(--button-solid-bg)] px-6 py-3 font-semibold text-[var(--button-solid-text)] transition duration-300 hover:bg-[var(--button-solid-hover-bg)] hover:text-[var(--button-solid-hover-text)]">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
