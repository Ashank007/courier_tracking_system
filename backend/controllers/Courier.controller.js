import db from '../database/db.js';
import HandleResponse from "../utils/ApiResponse.js";
import HandleError from "../utils/ApiError.js";
import ValidateBody from '../utils/ValidateBody.js';

const CreateCourier = async (req,res) => {
  try {

  const id = req.user.id;

  if(!ValidateBody(['sender','receiver','origin','destination','trackingId'],req.body,res)) return;

  const {sender,receiver,origin,destination,trackingId} = req.body;

  const existingCourier = db.prepare(`SELECT * FROM couriers WHERE tracking_id = ?`).get(trackingId);
    
  if (existingCourier) {
      return HandleResponse(res, false, "Courier with this Tracking ID already exists", 400);
  }

  db.prepare(`INSERT INTO couriers (user_id,sender, receiver, origin, destination,tracking_id) VALUES (?, ?, ?, ?, ?, ?)`).run(id,sender,receiver,origin,destination,trackingId);

  db.prepare(`
      UPDATE users SET total_couriers_added = total_couriers_added + 1 WHERE id = ?
    `).run(id);

  db.prepare(`INSERT INTO activities (user_id,tracking_id,action) VALUES (?,?,?) `).run(id,trackingId,"added");

  HandleResponse(res,true,"Courier Created Successfully",201);

  } catch (error) {
    
    HandleError(res,false,error.message,500);

  }
}

const GetUserCouriers = async (req,res) => {
  try {

  const id = req.user.id;

  const data = db.prepare(`SELECT * FROM couriers WHERE user_id = ?;
`).all(id);
  
  HandleResponse(res,true,data,200);

  } catch (error) {
    
    HandleError(res,false,error.message,500);

  }
}

const GetCourierData = async (req,res) => {
  try {

  const id = req.params.id;

  const data = db.prepare(`SELECT * FROM couriers WHERE tracking_id = ?;
`).all(id);
  
  HandleResponse(res,true,data,200);

  } catch (error) {
    
    HandleError(res,false,error.message,500);

  }
}

const DeleteCourier = async (req,res) => {
  try {

  const id = req.user.id;

  const trackingId = req.params.id;

  db.prepare(`DELETE FROM couriers WHERE tracking_id = ?`).run(trackingId);
  
  db.prepare(`UPDATE users set total_couriers_deleted = total_couriers_deleted + 1 where id = ? `).run(id);  

  db.prepare(`INSERT INTO activities (user_id,tracking_id,action) VALUES (?,?,?) `).run(id,trackingId,"deleted");

  HandleResponse(res,true,"Courier Deleted Successfully",200);

  } catch (error) {
    
    HandleError(res,false,error.message,500);

  }
}


export {CreateCourier,GetUserCouriers,GetCourierData,DeleteCourier};
