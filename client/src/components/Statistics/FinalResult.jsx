
import { useSelector } from "react-redux"
import { FaTrophy } from "react-icons/fa";

const FinalResult = ()=>{
    const trades = useSelector(state=>state.trades.content)
    const gainSum = trades.reduce( (acc, trade) => acc + parseInt(trade.reward, 10),
    0)
    
    return (
        <div className="darkthemeBgCards rounded-4 boxshadow darkthemeText d-flex align-items-center justify-content-center flex-column" style={{height:'100%'}}>
            <div><FaTrophy style={{fontSize:'2em'}} /></div>            
            <h1 className="display-5">{gainSum}%</h1>
            <h4>Risultato Finale </h4>
        </div>
    )
}

export default FinalResult