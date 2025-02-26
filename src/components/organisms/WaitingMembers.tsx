import { useState } from "react"
 
interface Props {
    handleWaitingMember:()=>void;
}
 
const WaitingMembers = ({handleWaitingMember}:Props) => {
    const [countdown,setCountdown]= useState(10);

    const startCountdown=(value:number)=>{

        if(value === 1) {
            setCountdown(1);
            const timeout = setTimeout(()=>{
                 handleWaitingMember();
            },1000)
            return ()=>clearTimeout(timeout);
        } else{
           const interval =  setTimeout(() => {
            startCountdown(value-1);
            setCountdown(value-1);
        }, 1000);
        return ()=>clearTimeout(interval);
        }
    }

    if(countdown === 10) startCountdown(10); 

  return (
    <div className='bg-black/90 z-999 max-h-screen absolute top-0 left-0 right-0 bottom-0'>
     <div className="flex items-center justify-center h-full w-full">
        <h1  className="text-5xl font-semibold text-white" >ပွဲစတော့မယ် အခြားသူများကိုစောင့်ပါ </h1>
        <h1 className="ml-4 rounded-full border-4 w-[120px] h-[120px] flex items-center justify-center border-red-500 text-white text-6xl font-semibold" > {countdown}</h1>
     </div>
     
    </div>
  )
}

export default WaitingMembers
