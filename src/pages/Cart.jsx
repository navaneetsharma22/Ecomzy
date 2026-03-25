import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";




const Cart = () => {

  const cart = useSelector((state) => state.cart);
  console.log("Printing Cart");
  console.log(cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect( () => {
    setTotalAmount( cart.reduce( (acc, curr) => acc + curr.price,0) );
  }, [cart])

  return (
    <div className="max-w-6xl min-h-[calc(100vh-5rem)] mx-auto p-4 md:p-6">
  {
    cart.length > 0  ? 
    (<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-8">


      <div className="flex-1 flex flex-col gap-5">
        {
          cart.map( (item,index) => {
            return <CartItem key={item.id} item={item} itemIndex={index} />
          } )
        }
      </div>

      <div className="w-full lg:max-w-sm">

        <div className="sticky top-24 border border-slate-200 rounded-xl shadow-sm p-6 bg-white">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Your Cart</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">Summary</div>
          <p className="mt-5 text-slate-600">
            <span className="font-medium">Total Items: {cart.length}</span>
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-lg text-slate-800">
            Total Amount: <span className="font-bold text-green-700">${totalAmount.toFixed(2)}</span>
          </p>
          <button className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300">
            CheckOut Now
          </button>
          </div>
        </div>

      </div>


    </div>) : 
    (<div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-slate-800">Cart Empty</h1>
      <Link to={"/"}>
        <button className="bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
          Shop Now
        </button>
      </Link>
    </div>)
  }
    </div>
  );
};

export default Cart;
