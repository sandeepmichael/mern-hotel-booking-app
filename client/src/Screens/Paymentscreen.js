import React from 'react'
import axios from 'axios'

const Paymentscreen = () => {

   const loadscript = (src) => {
        return new Promise(res => {
          const script = document.createElement('script')
          script.src = src
          script.onload = () => {
              res(true)
          }
          script.onerror = () => {
              res(false)
          }
          document.body.appendChild(script)
        })
   }

   const displayRazorpay = async () => {
       try {
           const res = loadscript('https://checkout.razorpay.com/v1/checkout.js')
           if(!res){
               alert('network error')
               return;
           }
           const {data} = await axios.post('/payment/order')
           if(!data){
               alert('network error')
               return;
           }
           const {amount, id:order_id, currency} = data;
           const options = {
               key:"rzp_test_EyKzln2GBspCl5",
               amount:amount.toString(),
               currency,
               name:'something',
               description:'description amount payment',
               image:'',
               order_id,
               handler: async function(response) {
                   const data = {
                       orderCreationId:order_id,
                       razorpayPaymentId:response.razorpay_payment_id,
                       razorpaySignature:response.razorpay_signature,
                       amount:amount.toString(),
                       currency,
                    }
                    const res = await axios.post('/payment/success', data)
                    console.log(res.data)
               },
               prefill : {
                   name:'sme name',
                   email:'123@gmail.com',
                   contact:'000000000',
               },
              

           }
           const paymentObject = new window.Razorpay(options)
           paymentObject.open()
       } catch (error) {
           console.log(error.message)
       }
   }




    return (
        <div className='App'>
     <button onClick={displayRazorpay}>Pay Now</button>
     </div>
    )
}

export default Paymentscreen
