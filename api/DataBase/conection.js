import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const URL = "mongodb+srv://shahmir_99:firecape188@cluster0.pppostr.mongodb.net/chatapp?retryWrites=true&w=majority"
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conneted With Database Successsfully");
  })
  .catch((err) => console.log(err));
