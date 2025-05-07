import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/db.js';
import HandleResponse from "../utils/ApiResponse.js";
import HandleError from "../utils/ApiError.js";
import ValidateBody from '../utils/ValidateBody.js';

const Register = async (req,res) => {
try {

  if(!ValidateBody(['username','email','password','role'],req.body,res)) return;

  const { username, email,password, role } = req.body;

  if (!['admin', 'user'].includes(role)) return HandleResponse(res,false,"Invalid Role",400);

  const existingUserUsername = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

  if (existingUserUsername) {
    return HandleResponse(res,false,"Username Already Taken",400);
  }

  const existingUserEmail = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (existingUserEmail) {
    return HandleResponse(res,false,"Email Already Taken",400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.prepare(`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`).run(username,email,hashedPassword,role);

  HandleResponse(res,true,"User Registered Successfully",201);

} catch (error) {
    HandleError(res,false,error.message,500);
}
}

const Login = async (req,res) => {
try {

  if(!ValidateBody(['email','password'],req.body,res)) return;

  const { email, password} = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if(!user){
   return HandleResponse(res,false,"User Doesn't Exits Invalid Email",404);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return HandleResponse(res,false,"Invalid Credentials",401);
  }

  const token = jwt.sign({ id: user.id, role: user.role,email:user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

  HandleResponse(res,true,token,201);

} catch (error) {
    HandleError(res,false,error.message,500);
}
}

const GetProfileData = async (req,res) => {
try {

  const id = req.user.id;

  const user = db.prepare('SELECT username,email,total_couriers_added,total_couriers_deleted FROM users WHERE id = ?').get(id);

  if(!user){
   return HandleResponse(res,false,"User Doesn't Exits",404);
  }

  HandleResponse(res,true,user,201);

} catch (error) {
    HandleError(res,false,error.message,500);
}
}

const EditProfileData = async (req,res) => {
try {

  const id = req.user.id;

  if(!ValidateBody(['username','email'],req.body,res)) return;

  const { username, email } = req.body;

  const user = db.prepare('SELECT username, email, total_couriers_added, total_couriers_deleted FROM users WHERE id = ?').get(id);

  if(!user){
   return HandleResponse(res,false,"User Doesn't Exits",404);
  }

  const updateStmt = db.prepare(
      'UPDATE users SET username = ?, email = ? WHERE id = ?'
  );

  const updateResult = updateStmt.run(username, email, id);

  if (updateResult.changes === 0) {
      return HandleResponse(res, false, "No changes made", 400);
  }

  const updatedUser = db.prepare('SELECT username, email, total_added_orders, total_deleted_orders FROM users WHERE id = ?').get(id);

  HandleResponse(res,true,updatedUser,201);

} catch (error) {
    HandleError(res,false,error.message,500);
}
}


export {Register,Login,GetProfileData,EditProfileData};
