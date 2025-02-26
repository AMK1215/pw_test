import  { useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const AuthGuard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
   useEffect(()=>{
    if(location.pathname !=='/login') {
        if(!user?.user_name){
         navigate('/login')
       }
    }
   },[])
    return (
        <div></div>
    )
   
}

export default AuthGuard
