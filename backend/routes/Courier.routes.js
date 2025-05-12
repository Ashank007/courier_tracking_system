import express from "express";
import isauthenticated from "../middlewares/isauthenticated.js";
import { CreateCourier, DeleteCourier, GetAllCouriers, GetCourierData, GetRecentActivites, GetUserCouriers, RecieveCouriers, UpdateCourierStatus } from "../controllers/Courier.controller.js";

const CourierRouter = express.Router();

CourierRouter.get("/all",isauthenticated,GetAllCouriers);
CourierRouter.post("/create",isauthenticated,CreateCourier);
CourierRouter.get("/sent",isauthenticated,GetUserCouriers);
CourierRouter.get("/received",isauthenticated,RecieveCouriers);
CourierRouter.get("/recent",isauthenticated,GetRecentActivites);
CourierRouter.get("/:id",isauthenticated,GetCourierData);
CourierRouter.delete("/:id",isauthenticated,DeleteCourier);
CourierRouter.put("/:id/status",isauthenticated,UpdateCourierStatus);
export default CourierRouter;
