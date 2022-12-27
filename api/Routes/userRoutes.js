import express from "express"
const route = express.Router()
import { login , register , allUsers} from "../Controllers/authController.js";
import {Protected} from "../Middleware/AuthMiddleware.js"

route.post("/login", login)
route.post("/register", register)
route.get("/allusers", Protected , allUsers)


export default route;