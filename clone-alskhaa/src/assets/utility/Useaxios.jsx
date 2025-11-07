
import React, { useState } from 'react'
import axiosInstance from './AxiosInstance';

function Useaxios() {
    // const [loading, setLoading] = useState(false);
    // const {loading, setLoading} = useAuth();

    const fetchData = async({url, method = 'get', data = {} ,headers={}}) =>{
        setLoading(true)
        try {
            const res = await axiosInstance({
                url,
                method,
                data,
                headers
                // headers optional
            }); 
            return res.data;

        } catch (error) {
           throw error;
        //    setLoading(false);
        } finally {
      setLoading(false);
    }
    }
  return { fetchData, loading };
}

export default Useaxios