import express from "express"
const route = express.Router()
import {Sendmessage , Allmessages} from "../Controllers/messageController.js"
import {Protected} from "../Middleware/AuthMiddleware.js"

route.post('/' , Protected , Sendmessage)
route.get('/chat/:id' , Protected, Allmessages)

export default route;