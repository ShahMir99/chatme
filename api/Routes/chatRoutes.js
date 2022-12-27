import express from "express"
const route = express.Router();
import {Protected} from "../Middleware/AuthMiddleware.js"
import {accessChat , fetchChat , createGroupchat , renameGroup , AddtoGroup , removeuser} from "../Controllers/chatController.js"

route.post("/" , Protected  , accessChat)
route.get("/:id" , fetchChat)
route.post("/group" , Protected  , createGroupchat)
route.put("/rename" , Protected  , renameGroup)
route.put("/addtogroup" , Protected  , AddtoGroup)
route.put("/removeuser" , Protected  , removeuser)

export default route;