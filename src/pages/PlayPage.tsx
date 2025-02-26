import User from '../components/molecules/User'
import coin5 from '../assets/images/coin5.png'
import coin25 from '../assets/images/coin25.png'
import coin50 from '../assets/images/coin50.png'
import coin100 from '../assets/images/coin100.png'
import coin500 from '../assets/images/coin500.png'
import coin1000 from '../assets/images/coin1000.png'
import box from '../assets/images/box.png'
import Cards from '../components/organisms/Cards'
import useCoinStore from '../stores/coinStore'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import WaitingMembers from '../components/organisms/WaitingMembers'
import BettingBalance from '../components/organisms/BettingBalance'
import CountdownTimer from '../components/molecules/CountdownTimer'
import BettingBalanceClose from '../components/organisms/BettingBalanceClose'
import PoneWineSpin from '../components/organisms/PoneWineSpin'
import { useNavigate } from 'react-router-dom'


const PlayPage = () => {
  const navigate = useNavigate();
  const [isWaitingMemberEnd, setIsWaitingMemberEnd] = useState(false);
  const [isBettingBalanceShow, setIsBettingBalanceShow] = useState(false);
  const [isBettingCloseShow,setIsBettingCloseShow] = useState(false);

  const { user } = useAuth();
  const [totalBet, setTotalBet] = useState(0);

  const coins = [
    { img: coin5, value: 5 },
    { img: coin25, value: 25 },
    { img: coin50, value: 50 },
    { img: coin100, value: 100 },
    { img: coin500, value: 500 },
    { img: coin1000, value: 1000 },
  ];
  const { selectCoin ,reset } = useCoinStore();

  const handleSelectCoin = (data: { img: string; value: number }) => {
    selectCoin({ img: data.img, value: data.value })
    // alert(value + " is selected!")
  }
  const handleWaitingMember = () => {
    setIsWaitingMemberEnd(true);
    setIsBettingBalanceShow(true);
  }
  const handleBettingBalance = () => {
    setIsBettingBalanceShow(false);
    setIsTimerShow(true);
  }
  const [isTimerShow, setIsTimerShow] = useState(false);
  const [isPoneWinSpinShow,setIsPoneWineSpinShow]=useState(false);

  const onPoneWineSpinShow =()=>{
    setIsPoneWineSpinShow(true);
  }
  
  const onPoneWineSpinClose =()=>{
    setIsPoneWineSpinShow(false);
    reset();
    const timer = setTimeout(()=>{
      navigate('/');
    },1500);
    return () => clearTimeout(timer);
    }
  const onTimerEnd = () => {
    setIsTimerShow(false);
   }

  return (<>
    {!isWaitingMemberEnd && <WaitingMembers handleWaitingMember={handleWaitingMember} />}
    {isBettingBalanceShow && <BettingBalance handleBettingBalance={handleBettingBalance} />}
    {isTimerShow && <CountdownTimer onPoneWineSpinShow={onPoneWineSpinShow} 
     setIsBettingCloseShow={setIsBettingCloseShow} onTimerEnd={onTimerEnd} />}
    {isBettingCloseShow && <BettingBalanceClose />}
    {isPoneWinSpinShow && <PoneWineSpin onPoneWineSpinClose={onPoneWineSpinClose} />}
     <div className={`homeCover min-h-screen py-10 flex flex-col  justify-center`}>
      <div className="grid grid-cols-4 gap-10">
        <div className='flex flex-col gap-2 pl-10'>
          {[1, 2, 3, 4, 5].map((_, index) => {
            return <User key={index} isImgFirst={true} />
          })}
        </div>
        <div className='col-span-2'>
          <Cards handleTotalBet={setTotalBet} />
        </div>
        <div className='flex flex-col gap-2'>
          {[1, 2, 3, 4, 5].map((_, index) => {
            return <User key={index} isImgFirst={false} />
          })}
        </div>
      </div>
      <div className='-mt-4'>
        {/* <Selection /> */}
        <div className="flex items-center justify-center gap-10">
          {/* <User isImgFirst={true} /> */}
          <h1 className='text-2xl font-bold text-white'>{user?.user_name}</h1>
          {coins.map((item, index) => {
            return <img onClick={() => handleSelectCoin(item)} key={index} src={item.img} className='w-[40px] h-[40px] rounded-full' />
          })}
          <div className="flex items-center">
            <div className="rounded-l-full py-2 px-4 bg-sky-500/40 text-white text-xl font-bold">
              Total Bet - {totalBet}  KYATS
            </div>
            <img src={box} className='w-[80px] h-[80px] rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default PlayPage
