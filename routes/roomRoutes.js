const express = require('express')
const router = express.Router()
const Room = require('../models/room')


router.get('/getrooms', async(req, res) => {
    
  try {
    const rooms = await Room.find()
      res.json(rooms)
} catch (error) {
    return res.status(400).json({ message: 'something went wrong' });
}
});


router.post("/getroombyid", async(req, res) => {
  const roomid = req.body.roomid
 // console.log(roomid)
  try {
       const room = await Room.findOne({_id:roomid})
       res.send(room)
  } catch (error) {
       return res.status(400).json({ message: error });
  }

});



router.post('/addroom', async(req, res) => {
  const { name , 
    rentperday, maxcount ,description ,phonenumber ,type , imgurl1, imgurl2, imgurl3} = req.body

    const newroom = new Room({
         name,
         rentperday, 
         maxcount , description , phonenumber , type , 
         imageurls:[imgurl1 , imgurl2 ,imgurl3] , 
         currentbookings:[]
    })
    try {
         await newroom.save()
         res.send('New Room Added Successfully')
    } catch (error) {
         return res.status(400).json({ error });
    }
})



module.exports = router