const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
        
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


router.post('/myOrderData', async (req, res) => {
    try {
        const { email } = req.body;
        const eId = await Order.findOne({ 'email': email });
        const orderData = eId.order_data;
       

        orderData.forEach((orderGroup) => {
            let orderPrice = 0;
            for (let i = 1; i < orderGroup.length; i++) {
                if (orderGroup[i].totalPrice) {
                    orderPrice += orderGroup[i].totalPrice;
                }
            }
            orderGroup.push({orderprice:orderPrice});
        });

        res.json({ orderData: eId});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/todaysorders', async (req, res) => {
    try {
        const today = new Date().toDateString(); 

        const order = await Order.findOne({ email: req.body.email });

        const todayOrders = order.order_data.filter((orderGroup) => {
            const orderDate = orderGroup[0].Order_date;
            return orderDate === today;
        });

        const extractedData = [];
        todayOrders.forEach((orderGroup) => {
            for (let i = 1; i < orderGroup.length; i++) {
                extractedData.push({
                    name: orderGroup[i].name,
                    brand: orderGroup[i].brand,
                    selectedQuantity: orderGroup[i].selectedQuantity,
                    totalPrice: orderGroup[i].totalPrice,
                });
            }
        });

        res.json({ orderData: extractedData });
        
    } catch (error) {
        res.send("Error: " + error.message);
    }
});

  
  

module.exports = router;
