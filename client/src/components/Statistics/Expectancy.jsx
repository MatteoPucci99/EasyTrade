import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";


const Expectancy = ()=>{
    const trades = useSelector(state=>state.trades.content)
    //Calcolo dell'expectancy
    const takeProfitTrades = trades.filter(trade => trade.result === 'Take Profit');   
    const winRate = (takeProfitTrades.length / trades.length).toFixed(2)
    const lossRate = 1 - winRate
    const stopLossTrades = trades.filter(trade => trade.result === 'Stop Loss');   
    const lossSum = stopLossTrades.reduce ((acc,trade)=> acc+parseInt(trade.reward, 10),0)
    const gainSum = takeProfitTrades.reduce( (acc, trade) => acc + parseInt(trade.reward, 10),
    0)
    const avgWin = (gainSum / takeProfitTrades.length).toFixed(2)
    const avgLoss = (lossSum / stopLossTrades.length).toFixed(2)
    const expectancy = ((winRate * avgWin) - (lossRate * avgLoss)).toFixed(2)
    return (
        <Container className="darkthemeBgCards rounded-4 boxshadow darkthemeText d-flex  flex-column justify-content-center align-items-center" style={{height:'300px'}}>
        <div className="text-center" style={{cursor:'pointer'}}     data-tooltip-id="my-tooltip"
        data-tooltip-html="L'Expectancy rappresenta la quantità media che ci si può aspettare <br> di guadagnare (o perdere) per ogni singolo trade."
        data-tooltip-place="top">       
            <h2>
            {expectancy}
            </h2>
            <h4>Expectancy</h4>
        </div>   
        <Tooltip id="my-tooltip"/>
    </Container>
    )
}

export default Expectancy