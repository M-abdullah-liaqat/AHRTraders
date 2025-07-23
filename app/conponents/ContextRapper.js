"use client"
import MyContext from "../context/Mycontext"
import { useState,useEffect } from "react"

function ContextRapper({children}) {
    const [Carts, setCarts] = useState([])
    useEffect(() => {
      let abd=JSON.parse(localStorage.getItem("carts"));
      if(abd){
          setCarts(abd)
      }
    }, [])
    
  return (
    <MyContext.Provider value={{Carts,setCarts}}>
        {children}
    </MyContext.Provider>
  )
}

export default ContextRapper
