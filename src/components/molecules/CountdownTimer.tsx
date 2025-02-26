import { useState } from 'react'

interface Props {
  onTimerEnd: () => void;
  setIsBettingCloseShow: (value: boolean) => void;
  onPoneWineSpinShow: () => void;
 }

const CountdownTimer = ({ onTimerEnd, setIsBettingCloseShow, onPoneWineSpinShow }: Props) => {
  const [countdown, setCountdown] = useState(15);

  const startCountdown = (value: number) => {
    //5 ===> 3
    if (value === 3) setIsBettingCloseShow(true);
    //3 ===> 1
    if (value === 1) {
      setIsBettingCloseShow(false);
      onPoneWineSpinShow();
    }
    if (value === 1) {
      setCountdown(1);
     return onTimerEnd();
     } else {
      const timer = setTimeout(() => {
        setCountdown(value - 1);
        startCountdown(value - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }

  if (countdown === 15) startCountdown(15);

  return (
    <div className='absolute top-4 right-4'>
      <h1 className='text-5xl text-white font-bold'>{countdown}</h1>
    </div>
  )
}

export default CountdownTimer
