import React from 'react'
import logo from '../img/logo.png'
import axiosinstance from '../axios/axios'
import { useState } from 'react'
import { useStateValue } from '../Context/StateProvider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
function Signin() {
  const history=useRouter()
  const [{token},dispatch]=useStateValue()
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  useEffect(()=>{
    const token=localStorage.getItem('user')
    const CompanyName=localStorage.getItem('companyName')
    const amount=localStorage.getItem('amount')
 console.log(CompanyName)
   if(token){
    dispatch({
      type:'companyName',
      companyName:CompanyName
    })
    dispatch({
      type:'amount',
      amount:amount
    })
    axiosinstance.post('http://localhost:3000/api/getTotalstock',{CompanyName:CompanyName})
    .then((res)=>{
      dispatch({
        type:'TotalSell',
        TotalSell:res.data.message
  })
  dispatch({
    type:'amount',
    amount:amount - res.data.amount
  })
      
    })
    .catch((err)=>{
      console.log(err)
    })
   
    dispatch({
      type:'signin',
      token:token
})
   }


   },[])
  const signin=()=>{
    axiosinstance.post('http://localhost:3000/api/company/signin',{companyEmail:email,password:password})
    .then((res)=>{
      console.log(res)

      if(res.status=='200'){
        localStorage.setItem('user',res.data.Accesstoken)
        localStorage.setItem('companyName',res.data.companyName)
        localStorage.setItem('amount',res.data.amount)
        dispatch({
          type:'signin',
          token:res.data.Accesstoken
    })
    dispatch({
      type:'companyName',
     companyName:res.data.companyName
})
history.push('/Home')

      }
    })
    .catch((err)=>{
        console.log(err)
    })

  }
  return (
    
    <div>
      <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
  <div className="container h-full p-10">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
      <div className="w-full">
        <div
          className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="g-0 lg:flex lg:flex-wrap">
          
            <div className="px-4 md:px-0 lg:w-6/12">
              <div className="md:mx-6 md:p-12">
              
                <div className="text-center">
                  <img
                    className="mx-auto w-20"
                    src={logo.src}
                     />
                  <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                    Thank You for Your Trust
                  </h4>
                </div>

                <form>
                  <p className="mb-4">Please login to your account</p>
               
                  <div className="relative mb-4" data-te-input-wrapper-init>
                    <input
                    onChange={(e)=>{setemail(e.target.value)}}
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput1"
                      placeholder="email" />
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >Email
                    </label>
                  </div>

                  <div className="relative mb-4" data-te-input-wrapper-init>
                    <input
                       onChange={(e)=>{setpassword(e.target.value)}}
                      type="password"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput11"
                      placeholder="Password" />
                    <label
                      htmlFor="exampleFormControlInput11"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >Password
                    </label>
                  </div>

             
                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                    onClick={signin}
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                      type="button"
                      data-te-ripple-init
                      >
                      Log in
                    </button>

                    <a href="#!">Forgot password?</a>
                  </div>


                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 mr-2">Don't have an account?</p>
                    <button
                      type="button"
                      className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      data-te-ripple-init
                      data-te-ripple-color="light">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>

           
            <div
              className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
              >
              <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                <h4 className="mb-6 text-xl font-semibold">
                  We are more than just a company
                </h4>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Signin