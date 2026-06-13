
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./meditem.css";
import { CartContext } from "../Context/CartContext";

const MedDisplay = () => {
  const { cart, addItem, removeItem } = useContext(CartContext);

  const [medicines, setMedicines] = useState([]);

  const url = "https://medicare-app-backend-g95p.onrender.com";

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `${url}/api/medicine/list`
      );

      if (response.data.success) {
        setMedicines(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <div className="med-container">
      {medicines.map((item) => {
        const qty = cart[item._id] || 0;

        return (
          <div key={item._id} className="med-card">
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
            />

            {qty === 0 ? (
              <div
                className="plus-icon"
                onClick={() => addItem(item._id)}
              >
                +
              </div>
            ) : (
              <div className="qty-box">
                <button
                  className="add-med"
                  onClick={() => removeItem(item._id)}
                >
                  -
                </button>

                <span>{qty}</span>

                <button
                  className="remove-med"
                  onClick={() => addItem(item._id)}
                >
                  +
                </button>
              </div>
            )}

            <div className="med-details">
              <h2>{item.name}</h2>
              <p className="description">{item.description}</p>
              <p className="price">₹{item.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MedDisplay;
