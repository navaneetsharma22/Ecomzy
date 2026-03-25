
import {FcDeleteDatabase} from "react-icons/fc"
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }

  return (
    <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-white shadow-sm">

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

        <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-50 rounded-lg p-2 flex items-center justify-center">
          <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-slate-900 font-semibold text-lg">{item.title}</h1>
          <h1 className="text-slate-500 text-sm mt-2 line-clamp-2">{item.description}</h1>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-green-700 font-bold text-lg">${item.price}</p>
            <button
              onClick={removeFromCart}
              className="h-10 px-4 rounded-full bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-sm flex items-center gap-2 cursor-pointer transition duration-200"
              aria-label={`Remove ${item.title} from cart`}
            >
              <FcDeleteDatabase/>
              Remove Item
            </button>
          </div>

        </div>


      </div>

    </div>
  );
};

export default CartItem;
