import { useState, useEffect } from "react";
import axios from 'axios'
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const abortCont = new AbortController();
        setTimeout(()=>{
          axios.get(url,{signal:abortCont.signal})
              .then(res=>{
                  if(res.status!==200)
                  {
                      throw Error('could not fetch data for this resource');
                  }
                  return res.data;
              })
              .then(data=>{
                  setData(data); 
                  setIsPending(false);
                  setError(null);
              })
              .catch(err=>{
                  if(!err.name==='AbortError')
                  {
                    setIsPending(false);
                    setError(err.message);
                    setData(null);
                  }
              })
        },1000)
        return ()=> abortCont.abort();
      },[url]);
      return {data, isPending, error}
}
 
export default useFetch;