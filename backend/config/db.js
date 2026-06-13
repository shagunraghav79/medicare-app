import mongoose from "mongoose";

export const connectdb = async() =>{
    await mongoose.connect("mongodb+srv://shagunraghav753_db_user:SqdArw5ykvwGZdWk@cluster0.2kavmp4.mongodb.net/madicare").then(() => console.log("db connected"));
} 