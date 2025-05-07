import express from 'express';
import { EditProfileData, GetProfileData, Login, Register } from '../controllers/User.controller.js';
import isauthenticated from '../middlewares/isauthenticated.js';

const Userrouter = express.Router();

Userrouter.post("/register",Register);
Userrouter.post("/login",Login);
Userrouter.get("/info",isauthenticated,GetProfileData);
Userrouter.put("/edit",isauthenticated,EditProfileData);
export default Userrouter;

