const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
}, {
   timestamps:true
})

const User = mongoose.model('users', userSchema)

module.exports = User;