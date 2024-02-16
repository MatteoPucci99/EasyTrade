import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Tooltip } from "react-tooltip";


const ProfitFactor = ()=>{
    //Calcolo del profitFactor
    const trades = useSelector(state=>state.trades.content)
    const takeProfitTrades = trades.filter(trade => trade.result === 'Take Profit');
    const stopLossTrades = trades.filter(trade=>trade.result === 'Stop Loss')
    const takeProfitResult = takeProfitTrades.reduce( (acc, trade) => acc + parseInt(trade.reward, 10),0)
    const stopLossResult = stopLossTrades.reduce( (acc, trade) => acc + parseInt(trade.reward, 10),0)
    const profitFactor = Math.abs(takeProfitResult / stopLossResult).toFixed(2)
    return (
        <Container className="darkthemeBgCards rounded-4 boxshadow darkthemeText d-flex  flex-column justify-content-center align-items-center" style={{height:'300px'}}>
            <div className="text-center" style={{cursor:'pointer'}} data-tooltip-id="my-tooltip"
            data-tooltip-content="Il Profit Factor è il rapporto tra il profitto totale e la perdita totale."
            data-tooltip-place="top"
             >
                <h2>
                {profitFactor}
                </h2>
                <h5>Profit Factor</h5>

            </div>
            <Tooltip id="my-tooltip"/>
        </Container>
    )
}

export default ProfitFactor