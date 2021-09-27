const express = require('express')
const Razorpay  = require('razorpay')
const crypto = require('crypto')
const dotenv = require('dotenv')
const { stat } = require('fs')
const router = express.Router()

const instance = new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
})

dotenv.config()

router.post('/order', async(req, res) => {
    try {
        var options = {
            amount:39900,
            currency:'INR',
            receipt:'rcp12'
        }

        const order = await instance.orders.create(options)
        if(!order) return res.status(500).json({error:'some error occured'})
      return res.status(200).json(order)

    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/verify', async(req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            currency,
            amount
        } = req.body;
        const signature = crypto.createHmac('sha256', process.env.KEY_SECRET)
        signature.update(`${orderCreationId}|${razorpayPaymentId}`)
        const digest = signature.digest('hex')
        if(digest === razorpaySignature) return res.status(400).json({msg:'trancation not legit'})
        const captureResponse = await instance.payment.capture(
            razorpayPaymentId,
            currency,
            amount
        )
        return res.status(200).json({
            status:'success',
             orderId:orderCreationId,
             paymentId:razorpayPaymentId,
             captureResponse
        })
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router;