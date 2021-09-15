import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
import AOS from 'aos'
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:1000
});

const Bookingscreen = ({match}) => {
    const [loading, setLoading] = useState(true)
    const [room, setRoom] = useState()
   


    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
    const todate = moment(match.params.todate, 'DD-MM-YYYY')
    const totaldays = moment.duration(todate.diff(fromdate)).asDays()+1
    const[totalamount, setTotalamount] = useState()
    useEffect(() => {
       const user = JSON.parse(localStorage.getItem('currentuser'))
        if(!user){
            window.location.href = '/login'
        }
        const getroom = async () => {
            setLoading(true)
            const res = await axios.post('/api/getroombyid', {roomid})
            setRoom(res.data)
            setTotalamount(res.data.rentperday * totaldays) 
            setLoading(false)
        }
        getroom()
    }, [roomid, totaldays])



const onToken = async(token) => {
    console.log(token)
    const bookingDetails = {
        room,
        userid:JSON.parse(localStorage.getItem('currentuser'))._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
        }
        try {
            setLoading(true)
            const res = await axios.post('/api/bookings/bookroom', bookingDetails)
            setLoading(false)
            Swal.fire('Congrats! your room booked successfully', 'success').then(result =>{
                window.location.href = '/bookings'
            }) 
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }


}




    return (
        <div className='container' data-aos='zoom-in'>
           {loading ? (<Loader/>) : <div>
               <div className='row justify-content-center mt-5 bs'>
                   <div className='col-md-5'>
                       <h1>{room.name}</h1>
                       <img src={room.imageurls[0]} className='image2' alt="Image4" />
                       </div>
                       <div className='col-md-5'>
                           <div>
                           <h1>Booking Details</h1>
                           <hr />
                           <p>Name : {JSON.parse(localStorage.getItem('currentuser')).name}</p>
                           <p>From Date :{match.params.fromdate}</p>
                           <p>To Date : {match.params.todate}</p>
                           <p>max count: {room.maxcount}</p>
                           </div>

                           <div>
                               <h1>Amount</h1>
                               <hr />
                               <p>No of Days: {totaldays}</p>
                               <p>Rent Per Day: {room.rentperday}</p>
                               <p>Total: {totalamount} </p>
                               </div>
                               <div style={{float:'right'}} className='m-2'>
                                 
                                   <StripeCheckout
                                   currency='inr'
                                   amount={totalamount * 100}
                                   token={onToken}
                                    stripeKey="pk_test_51JFEwOSAYBgu61o0YcICNpABH2dthEbfCF9NKRhcyxsr87VuntfecBwX8dGvS18A1UGwoADcI72ruKRHXhNZfTNU00rEDZKmhV">
                                        <button className='btn btn-primary'>Pay Now</button>
                                    </StripeCheckout>
                               </div>

                       </div>


               </div>
               
               
               </div>}
        </div>
    )
}

export default Bookingscreen;

