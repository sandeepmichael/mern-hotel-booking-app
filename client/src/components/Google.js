import React, { } from 'react';
import { GoogleLogin,  } from 'react-google-login';


const clientId = "878786950565-kmum1ne551io15kq1ibvlae1to9bj11a.apps.googleusercontent.com";

function Login() {


    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
      
        window.location.href='/home'
       
    };
   
    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };
   
  








  return (
      <div style={{paddingTop:'1%'}}>
        
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Log In with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> 

          
            
            

      </div>
  )
}
export default Login;