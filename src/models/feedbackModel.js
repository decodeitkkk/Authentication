import mongoose from "mongoose";

let feedbackSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide name"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Please Provide email"],
    },
    phone:{
        type:Number,
        required:false
    },
    message:{
        type:String,
        required:[true,"Please Provide message"],
    },
    projectName:{
        type:String,
        required:false
    },
    date: Date

})

let FeedbackModel = mongoose.models.feedbacks || mongoose.model("feedbacks",feedbackSchema);
export default FeedbackModel
