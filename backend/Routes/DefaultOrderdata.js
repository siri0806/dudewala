const express = require('express');
const router = express.Router();
const Order = require('../models/DefaultOrders');
const OrderDB = require('../models/Orders');
const cron = require('node-cron');
const job = cron.schedule('0 0 * * *', async () => {
    try {
        const currentDate = new Date().toLocaleDateString();
        
        await Order.updateMany({}, { $set: { to_date: currentDate } });

        
        const orders = await Order.find({ to_date: currentDate });

        for (const order of orders) {
            let data = order.order_data
            await data.splice(0,0,{Order_date:order.to_date})
            let eId = await OrderDB.findOne({ 'email':order.email })    
            
            if (eId===null) {
                
                    await OrderDB.create({
                        email: order.email,
                        order_data:[data]
                    })
                
            }
        
            else {
                
                    await OrderDB.findOneAndUpdate({email:order.email},
                        { $push:{order_data: data} })
                
            }
        }

        console.log('Cron job executed successfully');
    } catch (error) {
        console.log('Cron job error:', error.message);
    }
});

job.start();

router.post('/DefaultOrderdata', async (req, res) => {
    let data = req.body.order_data

    let eId = await Order.findOne({ 'email': req.body.email })
    if (eId === null) {
        try {

            await Order.create({
                email: req.body.email,
                order_data: data,
                order_date: req.body.order_date,
                to_date: req.body.order_date
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
            res.json({ success: false })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


router.post('/DisplayDefaultOrderdata', async (req, res) => {
    try {
      const email = req.body.email;
      
      const order = await Order.findOne({ email });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      const fromDate = order.order_date;
      const toDate = order.to_date;
      const fromDatestr = new Date(order.order_date);
      const toDatestr = new Date(order.to_date);
      const timeDiff = toDatestr.getTime() - fromDatestr.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const { order_data } = order;
  
      const extractedData = order_data.map((orderItem) => ({
        name: orderItem.name,
        selectedQuantity: orderItem.selectedQuantity,
        totalPrice: orderItem.totalPrice,
        brand: orderItem.brand,
      }));
  
      res.json({extractedData,fromDate, toDate, daysDiff});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  router.post('/DropDefaultOrder', async (req, res) => {
    try {
        job.stop();
        const result = await Order.deleteOne({ email: req.body.email });
        
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Default order not found' });
        }
        
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
});
router.post('/CheckDefaultOrder', async (req, res) => {
    try {
      const existingOrder = await Order.findOne({ email: req.body.email });
      const exists = existingOrder !== null;
  
      res.json({ exists });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
