import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Userrouter from "./routes/User.routes.js";
import CourierRouter from "./routes/Courier.routes.js";

dotenv.config();
const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());

app.use("/api/v1/user",Userrouter);
app.use("/api/v1/courier",CourierRouter);

app.listen(process.env.PORT,() => {
  console.log(`Server is listening on PORT ${process.env.PORT}`);
})


