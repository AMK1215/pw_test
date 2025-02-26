import { useState } from "react";
import useCoinStore from "../../stores/coinStore";
import m1 from '../../assets/images/m1.png';
import m2 from '../../assets/images/m2.png';
import m3 from '../../assets/images/m3.png';
import m4 from '../../assets/images/m4.png';
import m5 from '../../assets/images/m5.png';
import m6 from '../../assets/images/m6.png';
import m7 from '../../assets/images/m7.png';
import m8 from '../../assets/images/m8.png';
import f1 from '../../assets/images/f1.png';
import f2 from '../../assets/images/f2.png';
import f3 from '../../assets/images/f3.png';
import f4 from '../../assets/images/f4.png';
import f5 from '../../assets/images/f5.png';
import f6 from '../../assets/images/f6.png';
import f7 from '../../assets/images/f7.png';
import f8 from '../../assets/images/f8.png';
import c1 from '../../assets/images/c1.png';
import c2 from '../../assets/images/c2.png';
import c3 from '../../assets/images/c3.png';
import c4 from '../../assets/images/c4.png';
import c5 from '../../assets/images/c5.png';
import c6 from '../../assets/images/c6.png';
import c7 from '../../assets/images/c7.png';
import c8 from '../../assets/images/c8.png';

interface Props {
  handleTotalBet: (value: number) => void;
}

const Cards = ({ handleTotalBet }: Props) => {
  const [totalBet, setTotalBet] = useState(0);
  const { selectedCoin, placeCoin, placedCoins ,reset } = useCoinStore();
  const [winningImage, setWinningImage] = useState<number | null>(null);

  const data = [
    { id: 1, img: m1 },
    { id: 2, img: m2 },
    { id: 17, img: c1 },
    { id: 18, img: c2 },
    { id: 9, img: f1 },
    { id: 10, img: f2 },
    { id: 3, img: m3 },
    { id: 4, img: m4 },
    { id: 19, img: c3 },
    { id: 20, img: c4 },
    { id: 11, img: f3 },
    { id: 12, img: f4 },
    { id: 5, img: m5 },
    { id: 6, img: m6 },
    { id: 21, img: c5 },
    { id: 22, img: c6 },
    { id: 13, img: f5 },
    { id: 14, img: f6 },
    { id: 7, img: m7 },
    { id: 8, img: m8 },
    { id: 23, img: c7 },
    { id: 24, img: c8 },
    { id: 15, img: f7 },
    { id: 16, img: f8 },
  ];

  const handleImageClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, id:number) => {
    if (selectedCoin) {
       const imageElement = document.getElementById(`image-${id}`);
      if (imageElement) {
         const rect = imageElement.getBoundingClientRect();

         const clickX = e.clientX - rect.left;  
        const clickY = e.clientY - rect.top;  

         placeCoin(id, clickX, clickY);

         const prevBet = totalBet + selectedCoin.value;
        setTotalBet(prevBet);
        handleTotalBet(prevBet);
      }
    }
  };

  // const determineWinner = () => {
  //    const randomIndex = Math.floor(Math.random() * data.length);
  //   setWinningImage(data[randomIndex].id);
  // };

  // const resetGame = () => {
  //   reset();
  //   setTotalBet(0);
  //   handleTotalBet(0);
  //   setWinningImage(null);
  // };

  return (
    <div className="p-4">
      <div className="grid grid-cols-6 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative cursor-pointer"
            onClick={(e) => handleImageClick(e, item.id)} // Pass the event and id
          >
            <img
              id={`image-${item.id}`}
              src={item.img}
              alt="image"
              className="w-24 h-24 object-cover rounded-lg"
            />
            {/* Render coins on top of the image */}
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Render placed coins */}
              {placedCoins
                .filter((placedCoin) => placedCoin.id === item.id)
                .map((coin, index) => (
                  <img
                    key={index}
                    src={coin.coin.img}
                    width={20}
                    height={20}
                    className="absolute rounded-full"
                    style={{
                      left: `calc(${coin.x}px - 10px)`,  
                      top: `calc(${coin.y}px - 10px)`,  
                      zIndex: placedCoins.length + index,
                    }}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={determineWinner}
          disabled={placedCoins.length === 0}
        >
          Determine Winner
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div> */}

      {winningImage && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Winning Image:</h2>
          <img
            src={data.find((img) => img.id === winningImage)?.img}
            alt="winning image"
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Cards;


// return (
//   <div className='w-full h-full pt-5 flex'>
//     <div className='w-[5%]' />
//     <div className='w-[95%] h-max'>
//       <div className="grid grid-cols-6 grid-rows-4 relative">
//         {/* Green Square at the Top Start of Each Column */}
//         <div className="absolute -top-10 left-[5.5%] w-[30px] h-[40px] bg-green-500 rounded-lg"></div>
//         <div className="absolute -top-10 left-[calc(22.66%)] w-[30px] h-[40px] bg-green-500 rounded-lg"></div>
//         <div className="absolute -top-10 left-[calc(39.33%)] w-[30px] h-[40px] bg-green-500 rounded-lg"></div>
//         <div className="absolute -top-10 left-[calc(56%)] w-[30px] h-[40px] bg-green-500 rounded-lg"></div>
//         <div className="absolute -top-10 left-[calc(72.66%)] w-[30px] h-[40px] bg-green-500 rounded-lg"></div>
//         <div className="absolute -top-10 left-[calc(89.33%)] w-[30px] h-[40px] bg-green-500 rounded-lg"></div>

//         {data.map((item, index) => (
//           <div key={index} className="pt-3 pl-3 rounded-lg relative flex items-center justify-center">
//             {/* Image */}
//             <img src={item.img} alt="image" className="z-2 w-24 h-24 object-cover rounded-lg border-3 border-red-500" />

//             {/* Horizontal Center Line */}
//             <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-[8px] bg-red-500"></div>

//             {/* Vertical Center Line */}
//             <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-[8px] bg-green-500"></div>

//             {/* Red Square on the Left Start of Each Row */}
//             {index % 6 === 0 && (
//               <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 w-[40px] h-[30px] bg-red-500 rounded-lg"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// )


 