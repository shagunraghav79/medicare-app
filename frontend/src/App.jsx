import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/cart.jsx";
import LoginPopup from "./component/loginpopup/loginpopup";
import Verify from "./pages/verify/verify.jsx";
import MyOrders from "./pages/myorders/myorders.jsx";


function App() {
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);

  return (
    <>
      {showLoginPopup && (
        <LoginPopup setShowLoginPopup={setShowLoginPopup} />
      )}

      <Routes>
        <Route
          path="/"
          element={<Home setShowLoginPopup={setShowLoginPopup} />}
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/verify" element={<Verify/>}/>
        <Route  path="/myorders" element={<MyOrders/>}/> 
      </Routes>
    </>
  );
}

export default App;
