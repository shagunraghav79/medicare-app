import medModel from "../models/medmodel.js";
import fs from  'fs'

const addmedicine = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const medicine = new medModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      // category: req.body.category,
      image: req.file.filename,
    });

    await medicine.save();

    res.json({
      success: true,
      message: "Medicine added successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// list medicine
const listmedicine = async (req, res) => {
  try {
    const medicines = await medModel.find({});

    res.json({
      success: true,
      data: medicines,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
}; 


// remove med


const removemedicine = async (req, res) => {
  try {
    const medicine = await medModel.findById(req.body.id);

    if (!medicine) {
      return res.json({
        success: false,
        message: "Medicine not found",
      });
    }

    fs.unlink(`uploads/${medicine.image}`, () => {});

    await medModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Medicine deleted",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
export { addmedicine,listmedicine,removemedicine };