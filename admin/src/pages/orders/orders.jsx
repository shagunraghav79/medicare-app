import React, { useEffect, useState } from "react";
import "./orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import boximg from "../../assets/3d-delivery-box-parcel_78370-825.avif";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const url = "http://localhost:4000"; // Backend URL

  const fetchAllOrders = async () => {
    try {
      console.log("Fetching orders...");

      const response = await axios.get(`${url}/api/order/list`);

      console.log("Response:", response.data);

      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Orders:", response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
      toast.error("Failed to fetch orders");
    }
  };
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });

      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={boximg} alt="Order Box" />

            <p>
              <b>Items:</b>{" "}
              {order.items.map((item, idx) => (
                <span key={idx}>
                  {item.name} x {item.quantity}
                  {idx !== order.items.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            <p>
              <b>Amount:</b> ₹{order.amount}
            </p>



            <p>
              <b>Payment:</b> {order.payment ? "Paid" : "Pending"}
            </p>

            <p>
              <b>Customer:</b> {order.address?.fullName}
            </p>

            <p>
              <b>Phone:</b> {order.address?.phone}
            </p>

            <p>
              <b>Address:</b> {order.address?.address},{" "}
              {order.address?.city}
            </p>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Packing Medicines">Packing Medicines</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;