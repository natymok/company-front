import React, { useState } from 'react'
import axiosinstance from '../axios/axios'
function VerifyEmail() {
    const verify=()=>{
        axiosinstance.post('/Verifyotp',{email,otp})
        .then((res)=>{
            if(res.status=='200'){
                console.log(res)
            }
            else{
                console.log(res)
            }
        })
        .catch((err)=>{
            console.log(err) 
        })
    }
    const [email,setEmail]=useState('')
    const [otp,setOtp]=useState('')
  return (
    <div>
        <p>we have sent otp code to your email </p>
        <input  onChange={(e)=>{setEmail(e.target.value)}} placeholder='userEmail'></input>
        <input onChange={(e)=>{setOtp(e.target.value)}} placeholder='otp'></input>
        <button onClick={verify} >Verify</button>
    </div>
  )
}

export default VerifyEmail