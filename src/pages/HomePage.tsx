import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { useAuth } from '../contexts/AuthContext';
import profile from '../assets/images/profile.png';

const HomePage = () => {

  const { user ,logout }  = useAuth();
  const navigate =  useNavigate();

  return (
    <div className='px-20 homeCover min-h-screen py-5 grid grid-cols-3'>
      <div className="flex flex-col items-center justify-center">
        <div className=' flex flex-col items-center justify-center backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-white font-bold text-xl'>
        <img src={profile} className=' w-[100px] h-[100px]' />
        <h1 className='my-2'>Name : {user?.user_name}</h1>
        <h1>Balance : {user?.balance}</h1>
        <button onClick={logout} className='cursor-pointer transition duration-300 transform hover:scale-110 bg-black/40 mt-8 py-2 px-8 rounded-lg backdrop-blur-2xl'>
          Logout
        </button>
        </div>
      </div>
     <div  className="col-span-2 px-20 flex flex-col items-center justify-center">
     <img src={logo} className='w-[250px] h-[250px] rounded-full  mb-20' />
       <button onClick={()=>navigate('/play')}
        type="submit"
        className="w-max cursor-pointer py-4 px-10 bg-white/20 backdrop-blur-xl uppercase text-xl   rounded-lg focus:outline-none  transition duration-300 transform hover:scale-105 font-bold text-[#FFE94D]"
      >
        Start Play
      </button>
     </div>
    </div>
  )
}

export default HomePage
