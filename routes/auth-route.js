const router = require('express').Router();
const User = require('../models/user');
const Chatroom = require('../models/chatroom')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', (req,res) => {
    bcrypt.hash(req.body.password, 10, (err,hash) =>{
        if(err){
            return res.json({success: false, message: "Hash Error"})
        }else{
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            user.save()
            .then((_) => {
                res.json({success: true, message: "Account has been created"})
            })
            .catch((err) => {
                if(err.code === 11000){
                    return res.json({success:false, message:"Email id already exists!"})
                }
                res.json({success: false, message: "Authentication failed"})
            })
        }

    })
   
});

router.post('/login', (req,res) => {
    User.find({email:req.body.email}).exec().then((result) => {
        if(result.length<1){
            return res.json({success: false, message: "User Not Found"})
        }
        const user =result[0];
        bcrypt.compare(req.body.password, user.password,(err, ret) =>{
            if(ret){
                const payload={
                    userId:user._id
                }
                const token=jwt.sign(payload, "webBatch")
                return res.json({success:true, token:token, message:"Login Successful"})
            }else{
                return res.json({success:false, message: "Password does not match!"})
            }
        })

    }).catch(err => {
        res.json({success: false, message:"Authentication failed"})
    })
});

module.exports = router;
