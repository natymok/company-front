import Link from "next/link"
import {AnimatePresence}from 'framer-motion'
import Signin from '../Component/Signin'
import { useEffect } from "react"
import { useStateValue } from "@/Context/StateProvider"
import axiosinstance from "../axios/axios"
import { useState } from "react"
import { ColorModeContext, useMode } from "../theme";
import Sidebar from "@/Component/Sidebar"
export default function index() {
  const [{token,CompanyName},dispatch]=useStateValue()
  const [isSidebar, setIsSidebar] = useState(true);
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
  return (
   <AnimatePresence>
     <Sidebar isSidebar={isSidebar}></Sidebar>
   </AnimatePresence>
  )
}
