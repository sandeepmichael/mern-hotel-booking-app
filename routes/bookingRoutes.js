const router = require('express').Router()
const moment = require('moment')
const Booking = require('../models/bookingmodel')
const Room = require('../models/room')
const stripe = require('stripe')('sk_test_51JFEwOSAYBgu61o02bxzfd8FCGKlpsFnM4a20ilkAezYwkph3dc8mG6YxVxWP2lALbxTk2bjjpyqV31r5nkZHisU00RjBYmWWa')
const { v4: uuidv4 } = require('uuid');

router.post('/bookroom', async(req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays, token  } = req.body;


    try {
        const customer = await stripe.customers.create({
          email: token.email,
          source: token.id,
        });
  
        const payment = await stripe.charges.create(
          {
            amount: totalamount * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
          },
          {
            idempotencyKey: uuidv4(),
          }
        );
        if(payment){

            const newbooking = new Booking({
                room:room.name,
                roomid:room._id,
                userid,
                fromdate: moment(fromdate).format("DD-MM-YYYY"),
                todate: moment(todate).format("DD-MM-YYYY"),
                totalamount,
                totaldays,
                transactionId: "1234",
              });
               const booking = await newbooking.save()
               const roomtemp = await Room.findOne({_id:room._id})
               roomtemp.currentbookings.push({
                   _id:booking._id,
                 fromdate:moment(fromdate).format('DD-MM-YYYY'),
                 todate:moment(todate).format('DD-MM-YYYY'),
                 userid:userid,
                 status:booking.status
            })
            await roomtemp.save()
    
               res.send('booked successfully')
        }
  
} catch(error) {
    console.log(error)
    res.status(400).json({error})
}


})


router.post('/getbookingsbyuserid', async(req, res) => {
  const userid = req.body.userid
  try {
    const bookings = await Booking.find({userid:userid})
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({error})
  }
})


router.post('/cancelbooking', async(req, res) => {
  const {bookingid, roomid} = req.body
  try {
    const bookingitem = await Booking.findOne({_id:bookingid})
    bookingitem.status = 'Cancelled'
    await bookingitem.save()

    const room = await Room.findOne({_id:roomid})
    const bookings = room.currentbookings
    const temp = bookings.filter(booking => booking.bookingid.toString()!== bookingid) //removing bookedroom from currentbookings
    room.currentbookings = temp
   await room.save()
  } catch (error) {
    return res.status(400).json({error})
  }
})



router.get('/getallbookings', async(req, res) => {
  try {
      const bookings = await Booking.find()
      res.send(bookings)
  } catch (error) {
    return res.status(400).json({error})
  }
})
module.exports = router;