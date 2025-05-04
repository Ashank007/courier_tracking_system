import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());

app.listen(process.env.PORT,() => {
  console.log(`Server is listening on PORT ${process.env.PORT}`);
})


