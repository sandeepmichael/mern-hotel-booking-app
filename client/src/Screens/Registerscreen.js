import React, {useState,} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Success from '../components/Success'
import  './registerscreen.css'


const Registerscreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)

   const Registerhandler = async() => {
       if(password === cpassword){
       const user = {
           name,
           email,
           password,
           cpassword
       }

          try{
              setLoading(true)
              const res = await axios.post('/api/users/register', user)
              console.log(res.data)
              setLoading(false)
              setSuccess(true)
              setName('')
              setEmail('')
              setPassword('')
              setCpassword('')
          }catch(error){
              console.log(error)
          }

    }else {
        alert('passwords do not match')
    }
   }

    return (
        <div>
            {loading && (<Loader />)}
            {success && (<Success message="Registered successfully"/>)}
         <div className="main-w3layouts wrapper">
		   <h1>Register</h1>
		   
           <div class="main-agileinfo">
			<div class="agileits-top">
				
            <input type='text' className='form-control' placeholder='name'
                     value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    <input type='text' className='form-control' placeholder='email'
                    value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type='text' className='form-control' placeholder='password'
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <input type='text' className='form-control' placeholder='confirm password'
                    value={cpassword} onChange={(e)=>setCpassword(e.target.value)}/>
					<div class="wthree-text">
						
						<div class="clear"> </div>
					</div>
                   <button className='btn btn-primary mt-2' onClick={Registerhandler}>Register</button>
                
				</div>
                   
				<p>Already Register? <a href="/login"> Login Now!</a></p>
			  </div>
		</div>

        <ul class="colorlib-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>

 </div>
 
    )
}

export default Registerscreen
