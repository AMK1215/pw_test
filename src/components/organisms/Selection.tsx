import SelectItem from '../molecules/SelectItem'
import useCoinStore from '../../stores/coinStore'

const Selection = () => {

  const { placeCoin, placedCoins, selectedCoin } = useCoinStore();
  console.log('placedCoins', placedCoins)
  const selections = [
    { id: 1, name: 'မင်းသား' },
    { id: 2, name: 'အတွဲ' },
    { id: 3, name: 'မင်းသမီး' },
    { id: 4, name: 'ထောင့်၄ထောင့်' },
  ]

  const onSelectItemClick = (e: any, item: { id: number; name: string }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    placeCoin(item.id, rect.x + rect.width / 2, rect.y + rect.height / 2);
    // alert(item.name + " is selected!")
  }

  return (
    <div className=' flex items-center gap-10 justify-center'>
      {selections.map((item, index) => {
        return <SelectItem onSelectItemClick={selectedCoin ? (e: any) => onSelectItemClick(e, item) : null} data={item} key={index} />
      })}
    </div>
  )
}

export default Selection
