const mongoose=require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    apartmentName: {
        type: String,
        required: true
      },
      blockNumber: {
        type: String,
        required: true
      },
      floorNumber: {
        type: Number,
        required: true
      },
      roomNumber: {
        type: String,
        required: true
      },
      contactNumber: {
        type: String,
        required: true
      },
      password:{
        type:String,
        required:true
      },
      date:{
        type:Date,
        default:Date.now
      },

});



module.exports=mongoose.model('user',UserSchema);
