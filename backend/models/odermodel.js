import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
 
  amount: {
    type: Number,
    required: true,
  },

  address: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },

  status: {
    type: String,
    default: "Medicine Packing",
  },

  payment: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const orderModel =
  mongoose.models.order ||
  mongoose.model("order", orderSchema);

export default orderModel;
