import express from "express";
import isauthenticated from "../middlewares/isauthenticated.js";
import { CreateCourier, DeleteCourier, GetCourierData, GetUserCouriers } from "../controllers/Courier.controller.js";

const CourierRouter = express.Router();

CourierRouter.post("/create",isauthenticated,CreateCourier);
CourierRouter.get("/get",isauthenticated,GetUserCouriers);
CourierRouter.get("/:id",isauthenticated,GetCourierData);
CourierRouter.delete("/:id",isauthenticated,DeleteCourier);

export default CourierRouter;
