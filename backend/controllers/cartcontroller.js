import userModel from "../models/usermodel.js";

// ADD TO CART
const addtocart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    console.log("USER ID:", userId);
    console.log("ITEM ID:", itemId);

    console.log("STEP 1");

    const userData = await userModel.findById(userId);

    console.log("STEP 2", userData);

    let cartData = userData.cartData || {};

    console.log("STEP 3", cartData);

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    console.log("STEP 4", cartData);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { cartData } },
      { new: true }
    );

    console.log("STEP 5", updatedUser);

    res.json({
      success: true,
      message: "Added to cart",
      cartData,
    });

  } catch (error) {
    console.log("ADD CART ERROR:", error);

    res.json({
      success: false,
      message: "ERROR",
    });
  }
};

// REMOVE FROM CART
const removefromcart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData }); 

    res.json({
      success: true,
      message: "Removed from cart",
      cartData,
    });
  } catch (error) {
    console.log("REMOVE CART ERROR:", error);

    res.json({
      success: false,
      message: "ERROR",
    });
  }
};

// GET CART
const gercart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);

    console.log("GET CART DATA:", userData.cartData);

    res.json({
      success: true,
      cartData: userData.cartData || {},
    });
  } catch (error) {
    console.log("GET CART ERROR:", error);
  }
};

export { addtocart, removefromcart, gercart };