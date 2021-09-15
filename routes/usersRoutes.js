const router = require('express').Router()
const User = require('../models/usermodel')



router.post('/register', async(req, res) => {
    try{
    const {name, email, password} = req.body
     let user = await User.findOne({email})
     if(user){
         res.status(400).json({message:'user already exists'})
     }

     user = new User({
         name,
         email,
         password
     })
     await user.save()
     res.status(201).json({message:'user registered successfully'})

    }catch(error) {
        console.log(error)
        res.status(500).send()
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            const temp = {
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                _id:user._id
            }
            res.send(temp)
        } else{
       
            res.status(400).json({message:'invalid credentials'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})



router.get('/getusers', async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({error})
    }
})
module.exports = router;