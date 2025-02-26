import { useState } from "react"
 
interface Props {
    handleBettingBalance:()=>void;
}
 
const BettingBalance = ({handleBettingBalance}:Props) => {
    const [countdown,setCountdown]= useState(2);

    const startCountdown=(value:number)=>{

        if(value === 1) {
            setCountdown(1);
            const timeout = setTimeout(()=>{
                handleBettingBalance();
            },500)
            return ()=>clearTimeout(timeout);
        } else{
           const interval =  setTimeout(() => {
            startCountdown(value-1);
            setCountdown(value-1);
        }, 1000);
        return ()=>clearTimeout(interval);
        }
    }

    if(countdown === 2) startCountdown(2); 

  return (
    <div className='bg-black/90 z-999 max-h-screen absolute top-0 left-0 right-0 bottom-0'>
     <div className="flex items-center justify-center h-full w-full">
        <h1  className="text-5xl font-semibold text-white" >
        ထိုးကြေးတင်လို့ရပါပီ

        </h1>
         
     </div>
     
    </div>
  )
}

export default BettingBalance;
