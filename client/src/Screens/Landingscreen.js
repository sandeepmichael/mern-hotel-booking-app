import React from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:2000
});

const Landingscreen = () => {
    return (
        <div className='row Landing'>
            <div className='col-md-12'>
                <h1 data-aos='flip-left' style={{fontSize:'130px'}}>Book.Com</h1>
                <Link to='/home'>
                <button data-aos='flip-right' className='btn landingbtn'>Get Started</button>
                </Link>

            </div>
            
        </div>
    )
}

export default Landingscreen
