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

  db.prepare(`UPDATE users SET total_couriers_added = total_couriers_added + 1 WHERE id = ?`).run(id);

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

  const data = db.prepare(`SELECT * FROM couriers WHERE id = ?;
`).get(id);
  
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

  HandleResponse(res,true,"Courier Deleted Successfully",200);

  } catch (error) {
    
    HandleError(res,false,error.message,500);

  }
}

const GetRecentActivites = async (req,res) => {
  try {

  const id = req.user.id;

  const data = db.prepare(`SELECT * from activities where user_id = ? `).all(id);

  HandleResponse(res,true,data,200);

  } catch (error) {
    
    HandleError(res,false,error.message,500);

  }
}

const GetAllCouriers = (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT 
        c.id, c.tracking_id, c.sender, c.receiver, c.origin, c.destination, c.status,
        c.created_at, c.updated_at,
        u.id AS user_id, u.username AS user_name, u.email AS user_email
      FROM couriers c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    `);

    const rows = stmt.all();

    const couriers = rows.map(row => ({
      id: row.id,
      trackingId: row.tracking_id,
      sender: row.sender,
      receiver: row.receiver,
      origin: row.origin,
      destination: row.destination,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      user: {
        id: row.user_id,
        name: row.user_name,
        email: row.user_email,
      },
    }));

    HandleResponse(res, true, couriers, 200);
  } catch (error) {
    HandleError(res, false, error.message, 500);
  }
};

const UpdateCourierStatus = async (req,res) => {
  try {

  if(!ValidateBody(['status','id'],req.body,res)) return ;

  const {status,id} = req.body;

  const data = db.prepare(`UPDATE couriers SET status = ? where id = ? `).run(status,id);

  if (data.affectedRows === 0) {
      HandleResponse(res,false,"Courier Not Found",404);
  }

  HandleResponse(res,true,"Courier Updated Successfully",200);

  } catch (error) {
    
    HandleError(res,false,error.message,500);

  }
}

const RecieveCouriers = async (req,res) => {
  try {

  const email = req.user.email;

  const data = db.prepare(`SELECT * FROM couriers WHERE receiver = ? ORDER BY created_at DESC`).all(email);

  console.log(data)

  HandleResponse(res,true,data,200);

  } catch (error) {
    
    HandleError(res,false,error.message,500);

  }
}


export {CreateCourier,GetUserCouriers,GetCourierData,DeleteCourier,GetRecentActivites,GetAllCouriers,UpdateCourierStatus,RecieveCouriers};
