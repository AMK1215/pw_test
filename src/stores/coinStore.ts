import { create } from 'zustand';

 interface CoinStore {
  selectedCoin: {img:string;value:number}|null;
  placedCoins: { id: number; coin: {img:string;value:number}; x: number; y: number }[];
  selectCoin: (coin: {img:string;value:number}) => void;
  placeCoin: (id: number, x: number, y: number) => void;
  reset:()=>void;
}

const useCoinStore = create<CoinStore>((set) => ({
  selectedCoin:null ,
  placedCoins: [],
  selectCoin: (coin) => set({ selectedCoin: coin }),
  placeCoin: (id, x, y) =>
    set((state) => ({
      placedCoins: [...state.placedCoins, { id, coin: state.selectedCoin!, x, y }],
      selectedCoin: null,
    })),
    reset:()=>set({selectedCoin:null,placedCoins:[]})
}));

export default useCoinStore;
