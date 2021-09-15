import React,{useState}  from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const Addroom = () => {
    const [name, setName] = useState('')
    const [rentperday, setRentperday] = useState('')
    const [maxcount, setMaxcount] = useState()
    const [description, setDescription] = useState()
    const[phonenumber, setPhno] = useState()
    const [type, setType] = useState()
    const [imgurl1, setImgurl1] = useState()
    const [imgurl2, setImgurl2] = useState()
    const [imgurl3, setImgurl3] = useState()
const Addroomhandler = async() => {
    const newroom = {
        name,
        rentperday,
        maxcount,
        description,
        phonenumber,
        type,
        imgurl1, imgurl2, imgurl3
    }

     try {
         const res = await axios.post('/api/addroom', newroom)
         console.log(res.data)
         Swal.fire('Congrats', "your new room added successfully", 'success').then(result=> {
             window.location.href ='/home'
         })
     } catch (error) {
         console.log(error)
     }
}





    return (
        <div>
            <div className='row'>
                <div className='col-md-8 m-4'>
                    <input type='text' placeholder='room name' className='form-control' value={name} 
                    onChange={(e) => setName(e.target.value)}/>
                    <input type='text' placeholder='rent per day' className='form-control' value={rentperday}
                    onChange={(e) => setRentperday(e.target.value)}/>
                    <input type='text' placeholder='max count' className='form-control' value={maxcount}
                    onChange={(e) => setMaxcount(e.target.value)}/>
                    <input type='text' placeholder='description' className='form-control' value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                    <input type='text' placeholder='phone number' className='form-control' value={phonenumber}
                    onChange={(e) => setPhno(e.target.value)}/>
                    <input type='text' placeholder='Type' className='form-control' value={type}
                    onChange={(e) => setType(e.target.value)}/>
                    <input type='text' placeholder='image url 1' className='form-control' value={imgurl1}
                    onChange={(e) => setImgurl1(e.target.value)}/>
                    <input type='text' placeholder='image url 2' className='form-control' value={imgurl2}
                    onChange={(e) => setImgurl2(e.target.value)}/>
                    <input type='text' placeholder='image url 3' className='form-control' value={imgurl3}
                    onChange={(e) => setImgurl3(e.target.value)}/>
                   <div>
                       <button className='btn btn-primary mt-2' onClick={Addroomhandler}>Add Room</button>
                   </div>

                </div>
            </div>
        </div>
    )
}    

export default Addroom