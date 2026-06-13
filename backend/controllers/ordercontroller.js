import orderModel from "../models/odermodel.js";
import userModel from '../models/usermodel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeorder = async (req, res) => {
  const frontend_url = "https://medicare-apppp.onrender.com/";

  try {
    const { items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await newOrder.save(); 

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 500, // ₹5
      },
      quantity: 1,
    });

    const session =
      await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      });

    await userModel.findByIdAndUpdate(
      req.userId,
      {
        cartData: {},
      }
    );

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {

    console.log("ORDER ERROR:", error);

    res.json({
      success: false,
      message: error.message

    });
  }
};


const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" })
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "not paid" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" })
  }

}

// order for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      userId: req.userId,
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// list order on admin pannle

const listOrders = async (req, res) => {
 try {
  const orders = await orderModel.find({});
  res.json({success:true,data:orders})
 } catch (error) {
  console.log(error);
  res.json({success:false,message:"error"})

 }


}


// update status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      status,
    });

    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { placeorder, verifyOrder, userOrders, listOrders ,updateStatus };
