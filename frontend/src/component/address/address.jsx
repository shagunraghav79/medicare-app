import React, { useState, useEffect } from "react";
import "./Address.css";

const Address = ({ setShowAddress }) => {
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const savedAddress = localStorage.getItem(`address_${userId}`);

    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    if (address.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    if (address.pincode.length !== 6) {
      alert("Please enter a valid 6-digit PIN Code");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    localStorage.setItem(
      `address_${userId}`,
      JSON.stringify(address)
    );

    alert("Address Saved Successfully");

    setShowAddress(false); 
  };

  return (
    <div className="address-form">
      <h2>Delivery Address</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={address.fullName}
        onChange={handleChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={address.phone}
        onChange={handleChange}
      />

      <textarea
        name="address"
        placeholder="Enter Full Address"
        value={address.address}
        onChange={handleChange}
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
      />

      <input
        type="text"
        name="pincode"
        placeholder="PIN Code"
        value={address.pincode}
        onChange={handleChange}
      />

      <button onClick={handleSave}>
        Save Address
      </button>
    </div>
  );
};

export default Address;