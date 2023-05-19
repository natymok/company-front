import React from 'react'
import  {motion} from 'framer-motion'
import { useEffect } from 'react'
import axios from '../axios/axios'
import Home  from '../pages/index'
import {useStateValue } from '@/Context/StateProvider'
function getNewComany() {
  const [{newcompany},dispatch]=useStateValue()
  const decline=(name)=>{

    axios.post('/admin/Declinesignup',{CompanyName:name}).then((data)=>{
        if(data){
          
         const updatedcopmanies2= newcompany.filter((item)=>(
          item.CompanyName!==name


          )

          )
          dispatch({
            type:'getnewCompany',
            newcompany:updatedcopmanies2
           })


        }
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }

  const accept=(name,email,password)=>{
   
    axios.post('/admin/acceptsignup',{CompanyName:name,CompanyEmail:email,password:password}).then((data)=>{
        if(data){
          
         const updatedcopmanies= newcompany.filter((item)=>(
          item.CompanyName!==name


          )

          )
          dispatch({
            type:'getnewCompany',
            newcompany:updatedcopmanies
           })


        }
    })
    .catch((err)=>{
      console.log(err)
    })
   
  }

  const i=0
 
  return (
   <>
  
  {newcompany && newcompany.map((item)=>(

<div key={item._id} className='flex ml-[20%] gap-[60px] p-3'>
 <p>{i+1}</p>
 <p>{item.CompanyName}</p>
 <p>{ item.CompanyEmail}</p>
 <motion.div onClick={()=>{accept(item.CompanyName,item.CompanyEmail,item.password)}} whileTap={{scale:1.2}} className='bg-green-400 rounded-full p-2 cursor-pointer'>Accept</motion.div>
 <motion.div onClick={()=>{decline(item.CompanyName)}} whileTap={{scale:1.2}}  className='bg-red-500 rounded-full p-2  cursor-pointer'>Decline</motion.div>

</div>

   
  ))}

    <Home> 
    

    </Home>
   </>
  )
}

export default getNewComany