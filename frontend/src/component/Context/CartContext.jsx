import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [medicineList, setMedicineList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const url = "http://localhost:4000";

  // Fetch medicines from database
  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${url}/api/medicine/list`);

      if (res.data.success) {
        setMedicineList(res.data.data);
      }
    } catch (err) {
      console.log("Fetch medicines error:", err);
    }
  };



  // Fetch cart from database
const fetchCart = async () => {
  try {
    console.log("TOKEN:", token);

    const res = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );
 
    console.log("GET CART RESPONSE:", res.data);

    if (res.data.success) {
      setCart(res.data.cartData);
      console.log("CART SET:", res.data.cartData);
    }
  } catch (err) {
    console.log("Fetch cart error:", err);
  }
};

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCart({});
    }
  }, [token]);

  // Add item to cart
  const addItem = async (id) => {
    try {
      // Update UI instantly
      setCart((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));

      if (token) {
        const res = await axios.post(
          `${url}/api/cart/add`,
          { itemId: id },
          {
            headers: { token },
          }
        );

        if (res.data.success) {
          setCart(res.data.cartData);
        }
      }
    } catch (err) {
      console.log("Add item error:", err);
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      if (token) {
        const res = await axios.post(
          `${url}/api/cart/remove`,
          { itemId: id },
          {
            headers: { token },
          }
        );

        if (res.data.success) {
          setCart(res.data.cartData);
        }
      } else {
        setCart((prev) => {
          const qty = (prev[id] || 0) - 1;

          if (qty <= 0) {
            const newCart = { ...prev };
            delete newCart[id];
            return newCart;
          }

          return {
            ...prev,
            [id]: qty,
          };
        });
      }
    } catch (err) {
      console.log("Remove item error:", err);
    }
  };

  const contextValue = {
    cart,
    setCart,
    addItem,
    removeItem,
    medicineList,
    url,
    token,
    setToken,
    fetchCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};