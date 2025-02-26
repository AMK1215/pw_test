import  { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import winnerImg from '../../assets/images/f3.png';

interface Props {
    onPoneWineSpinClose:()=>void;
}

const PoneWineSpin = ({onPoneWineSpinClose}:Props) => {
    const [isSpinning,setIsSpinning] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsSpinning(false);
        },2500)
        const resultTimer = setTimeout(()=>{
            onPoneWineSpinClose();
        },5500);
        return () => {
            clearTimeout(timer);
            clearTimeout(resultTimer)
        }
    },[])

    return (
        <div className='bg-black/80 z-999 max-h-screen absolute top-0 left-0 right-0 bottom-0'>
            <div className="relative w-full h-full flex items-center justify-center">
                <img src={logo} className={`${isSpinning ? 'animate-spin' : ''} w-[250px] h-[250px] rounded-full absolute bottom-[15%]`} />
                <img src={winnerImg} className={`absolute  object-cover w-[150px] h-[150px] rounded-full bottom-[15%] transition-all duration-1500 ${
            isSpinning ? "opacity-0 translate-y-[0]" : "opacity-100 translate-y-[-300px]"
          }`} />
            </div>
        </div>
    )
}

export default PoneWineSpin
