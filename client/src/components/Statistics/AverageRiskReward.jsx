import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Tooltip } from "react-tooltip";


const AverageRiskReward = ()=>{

    const trades = useSelector(state=>state.trades.content)
    //Array con soli takeprofit 
    const takeProfitTrades = trades.filter(trade => trade.result === 'Take Profit');  
    //Array con soli stoploss 
    const stopLossTrades = trades.filter(trade => trade.result === 'Stop Loss');   
    //Calcolo la perdita totale 
    const lossSum = stopLossTrades.reduce ((acc,trade)=> acc+parseInt(trade.reward, 10),0)
    //Calcolo il guadagno totale
    const gainSum = takeProfitTrades.reduce( (acc, trade) => acc + parseInt(trade.reward, 10),
    0)
    //Calcolo il guadagno medio
    const avgWin = (gainSum / takeProfitTrades.length).toFixed(2)
    //Calcolo la perdita media
    const avgLoss = (lossSum / stopLossTrades.length).toFixed(2)
    //Calcolo il winrate finale
    const avgRiskReward = Math.abs((avgWin / avgLoss).toFixed(2))

 

    return (
        <Container className="darkthemeBgCards rounded-4 boxshadow darkthemeText d-flex  flex-column justify-content-center align-items-center" style={{height:'300px'}}>
            <div className="text-center" style={{cursor:'pointer'}} data-tooltip-id="my-tooltip"
           data-tooltip-html="Il Risk Reward Medio è il rapporto tra l'importo medio che un trader rischia <br>in una singola operazione e l'importo medio guadagnato."
            data-tooltip-place="top">
                <h2>
                 {avgRiskReward}
                 </h2>
                <h4>Risk reward medio</h4>
            </div>
            <Tooltip id="my-tooltip"/>
    </Container>
    )
}

export default AverageRiskReward
