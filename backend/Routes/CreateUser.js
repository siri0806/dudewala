const express = require('express');
const router = express.Router();
const user = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post(
  '/CreateUser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'didnt match minimum length').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const User = await user.findOne({ email: req.body.email });
    if (User) {
      return res.status(409).send({ message: 'User with given email already exists!' });
    }

    try {
      const saltRounds = 10; // Number of salt rounds for bcrypt
      const salt = await bcrypt.genSalt(saltRounds);
      const secpassword = await bcrypt.hash(req.body.password, salt);

      await user.create({
        name: req.body.name,
        email: req.body.email,
        apartmentName: req.body.apartmentName,
        blockNumber: req.body.blockNumber,
        floorNumber: req.body.floorNumber,
        roomNumber: req.body.roomNumber,
        contactNumber: req.body.contactNumber,
        password: secpassword,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);





router.post("/LoginUser", [
    body('email').isEmail(),
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const foundUser = await user.findOne({ email });
  
      if (!foundUser) {
        return res.status(400).json({ error: "Invalid email. Please try again." });
      }
      const pwdcompare=await bcrypt.compare(password,foundUser.password)
      if (!pwdcompare) {
        return res.status(400).json({ error: "Password mismatch. Please try again." });
      }
      
      const data={
        user:{
           id:foundUser.id
        }
      }
      const authToken=jwt.sign(data,process.env.jwtsecret)
      res.json({ success: true ,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });


  router.post('/userprofile', async (req, res) => {
    try {
       
        let eId = await user.findOne({ 'email': req.body.email })
        
        res.json({userData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});


router.post('/updateUser', async (req, res) => {
  try {
    const { name, apartmentName, blockNumber, floorNumber, roomNumber, contactNumber } = req.body;

    
    const User = await user.findOneAndUpdate(
      { email: req.body.email },
      {
        name,
        apartmentName,
        blockNumber,
        floorNumber,
        roomNumber,
        contactNumber
      },
      { new: true } 
    );

    res.json({ success: true, User });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'An error occurred. Please try again.' });
  }
});

router.post('/validateOldPassword', async (req, res) => {
  try {
    const { email, oldPassword } = req.body;

    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ success: false, message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, foundUser.password);

    if (isPasswordValid) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: 'Invalid old password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});



router.post('/resetPassword', async (req, res) => {
  try {
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    const saltRounds = 10; // Number of salt rounds
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await user.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'An error occurred. Please try again.' });
  }
});


  
module.exports = router;