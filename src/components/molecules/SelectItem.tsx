import { useState } from "react";
import useCoinStore from "../../stores/coinStore";

interface Props {
  data: {
    id: number;
    name: string;
  };
  onSelectItemClick: ((e: any) => void) | null;
}

const SelectItem = ({ data, onSelectItemClick }: Props) => {
  const { placedCoins } = useCoinStore();

  const [coinPositions, setCoinPositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  const generateNewPosition = () => {
    return {
      x: Math.floor(Math.random() * 15) - 7, // -7px to +7px
      y: Math.floor(Math.random() * 15) - 7, // -7px to +7px
    };
  };

  return (
    <div
      onClick={onSelectItemClick ? onSelectItemClick : () => { }}
      className="relative px-2 py-1 bg-pink-500/40 rounded-xl text-center text-lg font-semibold text-white w-40 h-[50px]"
    >
      {data.name}

      <div className="absolute top-0 bottom-0 right-0 w-[40%] overflow-hidden">
        {placedCoins
          .filter((item) => item.id === data.id)
          .map((item, index) => {
            const coinId = item.coin.img;

            const pos =
              coinPositions[coinId] || generateNewPosition();

            if (!coinPositions[coinId]) {
              setCoinPositions((prev) => ({
                ...prev,
                [coinId]: pos,
              }));
            }

            return (
              <img
                key={index}
                src={item.coin.img}
                width={20}
                height={20}
                className="absolute rounded-full"
                style={{
                  right: `calc(10px + ${pos.x}px)`,
                  bottom: `calc(10px + ${pos.y}px)`,
                  zIndex: placedCoins.length + index, // Newest coin on top
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SelectItem;
