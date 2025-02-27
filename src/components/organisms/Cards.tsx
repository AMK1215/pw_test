import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
import useCoinStore from '../../stores/coinStore';
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
import axios from 'axios'; // Import axios for API calls

interface Props {
  handleTotalBet: (value: number) => void;
}

const Cards = ({ handleTotalBet }: Props) => {
  const [totalBet, setTotalBet] = useState(0);
  const { selectedCoin, placeCoin, placedCoins, reset } = useCoinStore();
  const [winningImage, setWinningImage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get the authenticated user

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

  // Function to generate a unique ID
  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36); // Convert current time to base-36 string
    const randomString = Math.random().toString(36).substring(2, 8); // Random string
    return `${timestamp}-${randomString}`; // Combine timestamp and random string
  };

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    if (!user) {
      setError('You must be logged in to place a bet.');
      return;
    }

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
        setError(null); // Clear any previous error
      }
    }
  };

  const calculateWinLoseAmount = (placedCoins, winningImageId) => {
    let totalWinLoseAmount = 0;

    // Define the payout factor (e.g., 2x for winning bets)
    const payoutFactor = 2;

    placedCoins.forEach((coin) => {
      if (coin.id === winningImageId) {
        // Player wins: add the bet amount multiplied by the payout factor
        totalWinLoseAmount += coin.coin.value * payoutFactor;
      } else {
        // Player loses: subtract the bet amount
        totalWinLoseAmount -= coin.coin.value;
      }
    });

    return totalWinLoseAmount;
  };

  const determineWinner = async () => {
    if (!user) {
      setError('You must be logged in to determine the winner.');
      return;
    }

    if (placedCoins.length === 0) {
      setError('Please place at least one bet before determining the winner.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    setWinningImage(data[randomIndex].id);

    // Generate unique roomId and matchId
    const roomId = generateUniqueId();
    const matchId = generateUniqueId();

    // Prepare data to send to the backend
    const requestData = [
      {
        roomId: roomId, // Use the generated roomId
        matchId: matchId, // Use the generated matchId
        winNumber: data[randomIndex].id, // Winning image ID
        players: [
          {
            playerId: user.user_name, // Use the authenticated user's username
            betInfos: placedCoins.map((coin) => ({
              betNumber: coin.id,
              betAmount: coin.coin.value,
            })),
            winLoseAmount: calculateWinLoseAmount(
              placedCoins,
              data[randomIndex].id
            ), // Calculate win/lose amount
          },
        ],
      },
    ];

    try {
      const response = await axios.post(
        'https://www.delightmyanmarthb.xyz/api/bet',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the auth token
            'X-Transaction-Key': 'yYpfrVcWmkwxWx7um0TErYHj4YcHOOWr', // Include the transaction key
          },
        }
      );

      console.log('Response from backend:', response.data);

      if (response.data.success) {
        // Handle successful response
        alert('Bet placed successfully!');
      } else {
        // Handle error response
        setError('Failed to place bet. Please try again.');
      }
    } catch (err) {
      console.error('Error sending data:', err);
      setError('An error occurred while placing the bet.');
    }

    // Reset the game after determining the winner
    reset();
    setTotalBet(0);
    handleTotalBet(0);
  };

  return (
    <div className='p-4'>
      <div className='grid grid-cols-6 gap-4'>
        {data.map((item) => (
          <div
            key={item.id}
            className='relative cursor-pointer'
            onClick={(e) => handleImageClick(e, item.id)}
          >
            <img
              id={`image-${item.id}`}
              src={item.img}
              alt='image'
              className='w-24 h-24 object-cover rounded-lg'
            />
            <div className='absolute top-0 left-0 w-full h-full'>
              {placedCoins
                .filter((placedCoin) => placedCoin.id === item.id)
                .map((coin, index) => (
                  <img
                    key={index}
                    src={coin.coin.img}
                    width={20}
                    height={20}
                    className='absolute rounded-full'
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

      <div className='mt-4'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
          onClick={determineWinner}
          disabled={placedCoins.length === 0 || !user}
        >
          Determine Winner
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded'
          onClick={() => {
            reset();
            setTotalBet(0);
            handleTotalBet(0);
            setError(null);
          }}
        >
          Reset Game
        </button>
      </div>

      {error && <div className='mt-4 text-red-500'>{error}</div>}

      {winningImage && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>Winning Image:</h2>
          <img
            src={data.find((img) => img.id === winningImage)?.img}
            alt='winning image'
            className='w-24 h-24 object-cover rounded-lg'
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
