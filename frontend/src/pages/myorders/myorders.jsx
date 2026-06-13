import React, { useContext, useEffect, useState } from "react";
import "./myorder.css";
import { CartContext } from "../../component/context/CartContext";
import axios from "axios";
import boximg from "../../assets/3d-delivery-box-parcel_78370-825.avif";
import { FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";

const MyOrders = () => {
  const { url, token } = useContext(CartContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userOrders`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setData(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <Link to="/">
          <button className="my-order-checkout-button">
            <FaArrowLeft />
          </button>
        </Link>
      <h2>My Orders</h2>

      <div className="container">
        {data.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={boximg} alt="Order Box" />

              <p> 
                {order.items.map((item, idx) => (
                  <span className="name-quan" key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

              <p>₹{order.amount}</p>

              <p>
                Items:{" "}
                {order.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </p>

              <p>
                <span>&#x25cf;</span>{" "}
                <b>{order.status || "Food Processing"}</b>
              </p>

              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;