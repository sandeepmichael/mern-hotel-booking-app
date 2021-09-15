import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Swal from 'sweetalert2'
import { Tag, } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Profilescreen = () => {

    const user  = JSON.parse(localStorage.getItem('currentuser'))
useEffect(() => {
   
      if(!user){
          window.location.href='/login'
      }
},[user])


    return (
        <div className='ml-3 mt-3'>
              <Tabs defaultActiveKey="1">
    <TabPane tab="Profile" key="1">
     <h1>My Profile</h1>
     <br />
     <h1>Name : {user.name}</h1>
     <h1>Email : {user.email}</h1>
     <h1>isAdmin : {user.isAdmin ? 'YES':'NO'}</h1>
    </TabPane>
    <TabPane tab="Bookings" key="2">
    <MyBookings />
    </TabPane>
  </Tabs>
        </div>
    )
}

export default Profilescreen



export const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const user  = JSON.parse(localStorage.getItem('currentuser'))
    useEffect(() => {
        const getuserdata = async () => {
             setLoading(true)
            const res = await axios.post('/api/bookings/getbookingsbyuserid', {userid:user._id})
            //console.log(res.data)
            setBookings(res.data)
            setLoading(false)
        }
        getuserdata()
    }, [user._id])

const cancelbooking = async(bookingid, roomid) => {
    try {
        const res = await axios.post('/api/bookings/cancelbooking', {bookingid, roomid})
        console.log(res.data)
        Swal.fire('OK!' , 'your booking has been cancelled', 'success').then(result => {
            window.location.reload()
        })
    } catch (error) {
        console.log(error)
    }

}




    return (
        <div>
       <div className='row'>
           <h1>My Bookings</h1>
           <hr />
           <div className='col-md-6'>
               {loading && (<Loader />)}
               {bookings && bookings.map(booking => {
                   return <div className='bs'>
                       <h1>{booking.room}</h1>
                       <p>Booking Id: {booking._id}</p>
                       <p>Check In : {booking.fromdate}</p>
                       <p>Check Out : {booking.todate}</p>
                       <p>Amount : {booking.totalamount}</p>
                       <p>Status : {booking.status === 'Cancelled' ? (  <Tag color="orange">CANCELLED</Tag> ) :( <Tag color="green">CONFIRMED</Tag>)}</p>
                       
                        {booking.status !== 'Cancelled' && ( <div>
                         <button className='btn btn-primary' onClick={() => cancelbooking(booking._id, booking.roomid)}>Cancel Booking</button>
                         </div>
                        )}   
                       
                       </div>
               })}
           </div>
       </div>
        </div>
    )
}



