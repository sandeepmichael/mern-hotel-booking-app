import React,{useEffect, useState} from 'react'
import axios from 'axios'
  
 


const Rooms = () => {
    const [rooms, setRooms] = useState([])
  

    useEffect(() => {
        const getrooms = async() => {
            const res = await axios.get('/api/getrooms')
             console.log(res.data)
             setRooms(res.data)
           
        }
         getrooms()
    }, [])

  return (
      <div>
          <div className='row'>
              <div className='col-md-12'>
                
              <table className='table table-bordered table-black'>
                  <thead>
                      <tr>
                          <th>Room Id</th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>rentperday</th>
                          <th>max Count</th>
                          <th>phonenumber</th>                          
                      </tr>
                  </thead>
                  <tbody>
                      {rooms.length && rooms.map(room => {
                          return <tr>
                              <td>{room._id}</td>
                              <td>{room.name}</td>
                              <td>{room.type}</td>
                              <td>{room.rentperday}</td>
                              <td>{room.maxcount}</td>
                              <td>{room.phonenumber}</td>
                          </tr>
                      })}
                  </tbody>
              </table>
              </div>
          </div>

      </div>
  )

}

export default Rooms;