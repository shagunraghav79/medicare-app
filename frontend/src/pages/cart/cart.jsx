import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CartContext } from "../../component/context/CartContext";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Address from "../../component/address/Address";
import axios from "axios";

const Cart = () => {
  const {
    cart,
    removeItem,
    url,
    medicineList,
    token,
  } = useContext(CartContext);

  const [showAddress, setShowAddress] = useState(false);

  const getTotalCartAmount = () => {
    let total = 0;

    medicineList.forEach((item) => { 
      if (cart[item._id]) {
        total += item.price * cart[item._id];
      }
    });

    return total;
  };

  const deliveryFee = getTotalCartAmount() > 0 ? 5 : 0;

  const placeOrder = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const savedAddress = JSON.parse(
        localStorage.getItem(`address_${userId}`)
      );

      if (!savedAddress) {
        setShowAddress(true);
        alert("Please add your delivery address first.");
        return;
      }

      let orderItems = [];

      medicineList.forEach((item) => {
        if (cart[item._id] > 0) {
          let itemInfo = {
            ...item,
            quantity: cart[item._id],
          };

          orderItems.push(itemInfo);
        }
      });

      const orderData = {
        address: savedAddress,
        items: orderItems,
        amount:
          getTotalCartAmount() + deliveryFee,
      };

      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: { token },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        const { session_url } =
          response.data;

        window.location.replace(
          session_url
        );
      } else {
        alert("Failed to place order");
        console.log(response.data);
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };


  return (
    <div className="cartt">
      <div className="cart-checkout">
        <Link to="/">
          <button className="cart-checkout-button">
            <FaArrowLeft />
          </button>
        </Link>

        <h2>Checkout</h2>
      </div>

      <br />
      <hr />

      <div className="cart-items">
        <div className="cart-items-tittle">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {medicineList.map((item) => {
          if (cart[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-tittle cart-items-item">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                  />

                  <p>{item.name}</p>

                  <p>₹{item.price}</p>

                  <p>{cart[item._id]}</p>

                  <p>
                    ₹
                    {item.price *
                      cart[item._id]}
                  </p>

                  <p
                    className="cross"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    X
                  </p>
                </div>

                <hr />
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="cart-botton">
        <div className="cart-total">
          <p>Total Amount:</p>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>
                ₹
                {getTotalCartAmount()}
              </p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>TOTAL</b>
              <b>
                ₹
                {getTotalCartAmount() +
                  deliveryFee}
              </b>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-bar">
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="paytm"
            />
            Paytm
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="gpay"
            />
            Google Pay
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
            />
            Cash on Delivery
          </label>
        </div>

        <button
          className="cart-button"
          onClick={placeOrder}
        >
          Buy Now ₹
          {getTotalCartAmount() +
            deliveryFee}
        </button>
      </div>

      {showAddress && (
        <Address
          setShowAddress={
            setShowAddress
          }
        />
      )}
    </div>
  );
};

export default Cart;
