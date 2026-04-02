import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { remove } from "../redux/Slices/CartSlice";
import { formatCurrency } from "../utils/formatCurrency";
import { getFallbackImage } from "../utils/imageFallback";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  };

  return (
    <div className="rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 shadow-[var(--card-shadow)] backdrop-blur transition-colors duration-500 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="flex h-32 w-full flex-shrink-0 items-center justify-center rounded-[1.25rem] bg-[var(--product-image-bg)] p-3 transition-colors duration-500 sm:w-32">
          <img
            src={item.image}
            alt={item.title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = getFallbackImage(item.title, item.category);
            }}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h1 className="text-lg font-bold text-[var(--text-main)]">{item.title}</h1>
          <h1 className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">{item.description}</h1>
          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-black text-[var(--price-text)]">{formatCurrency(item.price)}</p>
            <button
              onClick={removeFromCart}
              className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--danger-bg)] px-4 text-sm font-semibold text-[var(--danger-text)] transition duration-200 hover:brightness-95 sm:w-auto"
              aria-label={`Remove ${item.title} from cart`}
            >
              <FcDeleteDatabase />
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
