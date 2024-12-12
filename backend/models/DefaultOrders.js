const mongoose=require('mongoose')
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    order_date:{
        type:String,
        required:true,
    },
    to_date:{
        type:String,
        required:true,
    },
    order_data: {
        type: Array,
        required: true,
    },

});

module.exports=mongoose.model('DefaultOrders',OrderSchema)