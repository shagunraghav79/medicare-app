import mongoose from "mongoose";


const medSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    // category:{type:String,default:"General"}
})

const medModel= mongoose.model.medicine || mongoose.model("medicine",medSchema)

export default medModel; 