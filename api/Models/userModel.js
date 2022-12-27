import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({

    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    profilePic : {
        type : String,
        require : true
    }


},{
    timestamps : true
})

userSchema.methods.generateJwtToken = async function (){
    try{
        const token = jwt.sign({_id : this._id , name : this.name , email : this.email} , "mernstackdeveloper12345shahmirjutt")
        return token;
        
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model("User",userSchema)

export default User;