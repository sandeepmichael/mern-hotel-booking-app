import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'


const Loginscreen = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const Loginhandler = async() => {

        const user = {

            email,
            password,

        }
        try{
            setLoading(true)
            const res = await axios.post('/api/users/login', user)
            console.log(res.data)
            setLoading(false)
            localStorage.setItem('currentuser', JSON.stringify(res.data))
            //props.history.push('/home')
           window.location.href = '/home'
          
        }catch(error){
            console.log(error)
        }
    }
  
    return (
        <div>
            {loading && (<Loader />)}
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
