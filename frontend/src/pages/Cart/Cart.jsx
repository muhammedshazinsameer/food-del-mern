import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, RemoveFromCart, food_list, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  // Prevent crash if still loading
  if (!cartItems || !food_list) {
    return <div className="cart">Loading cart...</div>;
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {food_list.map((item) => {
          const qty = cartItems[item._id] || 0;

          if (qty > 0) {
            return (
              <div key={item._id} className="cart-items-title cart-items-item">
                <img src={url + "/images/" + item.Image} alt={item.name} />
                <p>{item.name}</p>
                <p>{qty}</p>
                <p>₹{item.price}</p>
                <p>₹{item.price * qty}</p>

                <p className="cross" onClick={() => RemoveFromCart(item._id)}>
                  ×
                </p>
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 30}</p>
          </div>

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30}</b>
          </div>

          <button onClick={() => navigate("/Order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promo-code">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promo-code-inputs">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
