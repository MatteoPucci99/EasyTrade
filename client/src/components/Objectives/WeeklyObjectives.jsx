import { endOfWeek, format, startOfWeek } from "date-fns";
import it from 'date-fns/locale/it';
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux"
import WeeklyProgressBar from "./WeeklyProgressBar";


const WeeklyObjectives = (props)=>{

    const trades = useSelector(state=>state.trades.content)
    //Funzione per formattare data in "gennaio 2024"
    const formatDate = (dateString) => {
        const date = new Date(dateString.replace(/-/g, '/')); 
        return format(date, 'MMMM yyyy', { locale: it });
    };
    //Creo un oggetto date del mese che ricevo da Objectives
    const selectedDate = new Date(props.selectedMonth);
    //Filtro trades, confrontando il mese e l'anno del singolo trade con la data che mi arriva da Objectives
    const tradesOfTheMonth = trades.filter((trade) => {
      const tradeDate = new Date(trade.date);
      return (
        tradeDate.getMonth() === selectedDate.getMonth() &&
        tradeDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    
    const tradesByWeek = tradesOfTheMonth.reduce((acc, trade) => {
      const weekStart = startOfWeek(new Date(trade.date));
      const weekEnd = endOfWeek(new Date(trade.date));
      //Creo la chiave weekKey
      const weekKey = format(weekStart, 'yyyy-MM-dd');
      //Se la chiave non viene trovata inizializzo l'oggetto con chiave weekKey
      if (!acc[weekKey]) {
        acc[weekKey] = {
          trades: [],
          //Rappresenta l'intervallo della settimana
          interval: `${format(weekStart, 'd MMMM yyyy', { locale: it })} - ${format(
            weekEnd,
            'd MMMM yyyy',
            { locale: it }
          )}`,
        };
      }
      //Metto tutti i trade di quel intervallo settimanale dentro l'array
      acc[weekKey].trades.push(trade);
      return acc;
    }, {});
     // Ottengo un array di oggetti, in cui ogni oggetto ha le proprietà weekKey, totalReward, totalDrawdown e interval
    const weeklyTotals = Object.entries(tradesByWeek).map(([weekKey, { trades, interval }]) => ({
      weekKey,
      totalReward: trades.reduce((total, trade) => total + parseInt(trade.reward, 10), 0),
      totalDrawdown: trades.reduce((maxDrawdown, trade) => {
        const reward = parseInt(trade.reward, 10);
        const currentDrawdown = Math.min(maxDrawdown + reward, 0);
        return Math.min(maxDrawdown, currentDrawdown);
      }, 0),
      interval,
      }));    
      console.log(weeklyTotals)

    return (
        <Container className="darkthemeBgCards darkthemeText rounded-4 boxshadow">
            <Row className='row-cols-1 px-4 pb-4'>
                <h4 className="text-center pt-3">{props.selectedMonth && (formatDate(props.selectedMonth).slice(0,1).toLocaleUpperCase() + formatDate(props.selectedMonth).slice(1) )}</h4>
            {weeklyTotals.length > 0 ? (weeklyTotals.map(trade=>
                <Col className="border border-secondary rounded-4 mt-3 p-2">
                    <h6 className="fw-bold text-center text-secondary">{trade.interval.toLocaleUpperCase()}</h6>
                    <WeeklyProgressBar 
                        totalProfit={trade.totalReward}
                        maxDrawdown={trade.totalDrawdown}
                        singleStrategy={props.singleStrategy}/>
                </Col> )) : (<h5>Selezione prima un mese</h5>) }
            </Row>
        </Container>
    )
}

export default WeeklyObjectives