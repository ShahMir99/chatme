import mongoose from "mongoose";

mongoose.connect("mongodb+srv://shahmir_99:firecape188@cluster0.pppostr.mongodb.net/chatapp?retryWrites=true&w=majority").then(() => {
    console.log("Connection With mongodb Successfully")
}).catch((error) => {
    console.log(error.message)
})
