import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength: [3,"Name must be at least 3 characters long"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
        lowercase: true,  
        index: true
    },
    password:{
        type:String,
        required:true,
        minlength: [5, "Password must be at least 5 characters long"]
    },
    phone:{
        type:String,
        required:true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    },
    address:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
},{timestamps:true}
)
userSchema.index({ email: 1 });

export default mongoose.model('User',userSchema);