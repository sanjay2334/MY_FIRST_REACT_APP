import { useState ,useEffect } from "react"

const useFetch = (url) => {
    const [data,setData] = useState(null)
    const [isPending,setIsPending] = useState(true)
    const [error,setError] =  useState(null)
    const AbortCont = new AbortController

    useEffect(()=>{
        setTimeout(()=>{
         fetch(url,{signal:AbortCont.signal})
         .then(res=>{
           console.log(res)
           if (!res.ok) {
             throw Error("Could not fetch data from server check your internet")
           }
           return res.json()
         })
         .then(data=>{
           setData(data)
           setIsPending(false)
           setError(null)
         })
         .catch((err)=>{
            if(err.name === "AbortError"){
              console.log("fetch aborted")
            }else{
            setError(err.message)
            setIsPending(false)
            }
         })
        },500)

        return ()=>AbortCont.abort;
    },[url])

    return{data,isPending,error}
}
 
export default useFetch;