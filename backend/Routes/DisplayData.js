const express = require('express')
const router = express.Router()

router.post('/DisplayData',(req,res)=>{
    try {
        res.send([global.products,global.brand,global.category])
    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})

module.exports=router;