import express from 'express';
import cors from 'cors';
import{connectdb} from "./config/db.js"
import medRouter from './routes/medroute.js';
import userrouter from './routes/userroute.js';
import 'dotenv/config'
import cartRouter from './routes/cartroute.js';
import orderRouter from './routes/orderoute.js';
// import bodyParser from 'body-parser';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// config
const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  console.log("CONTENT-TYPE:", req.headers["content-type"]);
  next();
});

// db connection 
connectdb();

// apiendpoint
app.use("/api/medicine",medRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userrouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)




// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

