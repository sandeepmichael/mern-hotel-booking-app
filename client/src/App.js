import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route,} from 'react-router-dom'
import Homescreen from './Screens/Homescreen'
import Bookingscreen from './Screens/Bookingscreen';
import Registerscreen from './Screens/Registerscreen';
import Loginscreen from './Screens/Loginscreen';
import Profilescreen from './Screens/Profilescreen';
import Adminscreen from './Screens/Adminscreen';
import Landingscreen from './Screens/Landingscreen';
import Paymentscreen from './Screens/Paymentscreen';


function App() {
  return (
    <div className="App">
     <Navbar />
     <BrowserRouter>
     <Route  path='/home' exact component={Homescreen} />
     <Route  path='/book/:roomid/:fromdate/:todate' component={Bookingscreen} />
     <Route  path='/register' component={Registerscreen} />
     <Route  path='/login' component={Loginscreen} />
     <Route  path='/profile' component={Profilescreen} />
     <Route  path='/Admin' component={Adminscreen} />
     <Route  path='/' exact component={Landingscreen} />
     <Route path='/payment' component={Paymentscreen} />
     
     </BrowserRouter>
     
    </div>
  );
}

export default App;
