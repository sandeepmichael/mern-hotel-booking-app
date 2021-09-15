import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'


const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getbookedrooms = async() => {
            setLoading(true)
            const res = await axios.get('/api/bookings/getallbookings')
             console.log(res.data)
             setBookings(res.data)
             setLoading(false)
        }
         getbookedrooms()
    }, [])

  return (
      <div>
          <div className='row'>
              <div className='col-md-12'>
                {loading && (<Loader/>)}
              <table className='table table-bordered table-black'>
                  <thead>
                      <tr>
                          <th>Booking Id</th>
                          <th>User Id</th>
                          <th>Room</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Status</th>                          
                      </tr>
                  </thead>
                  <tbody>
                      {bookings && bookings.map(booking => {
                          return <tr>
                              <td>{booking._id}</td>
                              <td>{booking.userid}</td>
                              <td>{booking.room}</td>
                              <td>{booking.fromdate}</td>
                              <td>{booking.todate}</td>
                              <td>{booking.status}</td>
                          </tr>
                      })}
                  </tbody>
              </table>
              </div>
          </div>

      </div>
  )

}
export default Bookings;
