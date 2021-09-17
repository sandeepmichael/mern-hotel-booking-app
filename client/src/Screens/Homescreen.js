import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Room from '../components/Room'
//import Login from '../components/Google'
import Loader from '../components/Loader'
import { DatePicker,} from 'antd';
import {GoogleLogout} from 'react-google-login'
import moment from 'moment'
import 'antd/dist/antd.css'
const { RangePicker } = DatePicker



const clientId = "878786950565-kmum1ne551io15kq1ibvlae1to9bj11a.apps.googleusercontent.com";


function Homescreen() {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState()

    const [fromdate, setFromdate] = useState()
    const [todate, setTodate] = useState()
    const [duplicaterooms, setDuplicaterooms] = useState([])
    const [searchkey, setSearchkey] = useState()


    useEffect(() => {
        const getrooms = async () => {
            setLoading(true)
            const res = await axios.get('/api/getrooms')
            console.log(res.data)
            setRooms(res.data)
            setDuplicaterooms(res.data)
            setLoading(false)
        }
        getrooms()
    
    },[])
     const filterDate = (dates) => {
           setFromdate(moment(dates[0]).format('DD-MM-YYYY'))
           setTodate(moment(dates[1]).format('DD-MM-YYYY'))


           var temp=[]
       
             var availability = false;
             for (var room of duplicaterooms) {
                if(room.currentbookings.length > 0){
             for (var booking of room.currentbookings) {
                 if (
                   !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate) &&
                   !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                 ) {
                   if (
                     moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                     moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                     moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                     moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                   ) {
                     availability = true;
                   }
               }
            }
               
               
             }
             if(availability === true || room.currentbookings.length === 0) 
             {
               temp.push(room)
             }
             setRooms(temp)
           }
           
         }
       

   const SearchFilterrooms = () => {
     const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
     setRooms(temprooms)
   }

   const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    window.location.href='/login'
  
};





    return (
        <div className='container'>
          <div className='row mt-3'>
              <div className='col-md-3'>
                <RangePicker format='DD-MM-YYYY' onChange={filterDate}/>
              </div>
              <div className='col-md-3'>
                <input type='text' className='form-control' placeholder='Search rooms' value={searchkey}
                onChange={(e) => setSearchkey(e.target.value)} onKeyUp={SearchFilterrooms}/>

           


              </div>
                     <div style={{marginLeft:'40%', paddingBottom:'30'}}>
                             
                <GoogleLogout
                clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout>
                 </div>
                        



          </div>


            <div className='row justify-content-center mt-5'>
            {loading ? (<Loader/>): (rooms.map(room => {
                return <div className='col-md-9' data-aos='zoom-in'>
                    <Room room={room} fromdate={fromdate} todate={todate}/>
                </div>
            }))}
            </div>
        </div>
    )
}

export default Homescreen
