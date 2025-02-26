import user from '../../assets/images/user.png'

interface Props {
  isImgFirst: boolean;
  balance?: number;
}

const User = ({ isImgFirst, balance = 10000 }: Props) => {
  return (
    <div className='flex items-center'>
      <img src={user} className={`${isImgFirst ? 'order-1' : 'order-2'} rounded-full z-10 w-[80px] h-[80px] border-2 border-blue-500`} />
      <div className={`${isImgFirst ? 'order-2 -ml-4 rounded-r-xl pl-6' : 'order-1 -mr-4 rounded-l-xl pr-6'} text-md  italic px-2 uppercase font-bold bg-zinc-500/80 py-1 text-white`}>
        <p>Lorem ipsum</p>
        <p>{balance} Kyats</p>
      </div>
    </div>
  )
}

export default User
