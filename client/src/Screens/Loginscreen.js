import React, { useState } from 'react'
import axios from 'axios'
import Success from '../components/Success'
import Loader from '../components/Loader'
import Error from '../components/Error'


const Loginscreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const Loginhandler = async() => {

        const user = {

            email,
            password,

        }
        try{
            setLoading(true)
            const res = await axios.post('/api/users/login', user)
            console.log(res.data)
           
            localStorage.setItem('currentuser', JSON.stringify(res.data))
            //props.history.push('/home')
            setSuccess(true)
           window.location.href = '/home'
          
        }catch(err){
            setLoading(false)
            console.log(error)
            setError(true)
            setEmail('')
            setPassword('')
        }
    }
  
    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error error='Invalid Credentials'/>)}
          {success && (<Success success='User Login Successfull'/>)}
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div>
                        <h1>Login</h1>

                        <input type='text' className='form-control' placeholder='email'
                            value={email} onChange={(e) => setEmail(e.target.value)}  />
                        <input type='text' className='form-control' placeholder='password'
                            value={password} onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <button className='btn btn-primary mt-2' onClick={Loginhandler}>Login</button>
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
export default Loginscreen
