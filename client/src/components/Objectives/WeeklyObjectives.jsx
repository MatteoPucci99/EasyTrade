import { endOfWeek, format, startOfWeek } from "date-fns";
import it from 'date-fns/locale/it';
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux"
import WeeklyProgressBar from "./WeeklyProgressBar";


const WeeklyObjectives = (props)=>{

    const trades = useSelector(state=>state.trades.content)
    const formatDate = (dateString) => {
        const date = new Date(dateString.replace(/-/g, '/')); // Converti il formato della data
        return format(date, 'MMMM yyyy', { locale: it });
      };
      
      const selectedDate = new Date(props.selectedMonth + '/01');
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
        const weekKey = format(weekStart, 'yyyy-MM-dd');
        if (!acc[weekKey]) {
          acc[weekKey] = {
            trades: [],
            interval: `${format(weekStart, 'd MMMM yyyy', { locale: it })} - ${format(
              weekEnd,
              'd MMMM yyyy',
              { locale: it }
            )}`,
          };
        }
        acc[weekKey].trades.push(trade);
        return acc;
      }, {});
    
      const weeklyTotals = Object.entries(tradesByWeek).map(([weekKey, { trades, interval }]) => {
        let cumulativeReward = 0;
        let currentDrawdown = 0;
        let maxDrawdown = 0;
    
        const totalReward = trades.reduce((total, trade) => {
          const reward = parseInt(trade.reward, 10);
          cumulativeReward += reward;
    
          currentDrawdown = Math.min(currentDrawdown + reward, 0);
    
          maxDrawdown = Math.min(maxDrawdown, currentDrawdown);
    
          return total + reward;
        }, 0);
    
        const totalDrawdown = maxDrawdown;
    
        return {
          weekKey,
          totalReward,
          totalDrawdown,
          interval,
        };
      });
      console.log(weeklyTotals)

    return (
        <Container className="darkthemeBgCards darkthemeText rounded-4 boxshadow">
            <Row className='row-cols-1 px-4 pb-4'>
                <h4 className="text-center pt-3">{props.selectedMonth && (formatDate(props.selectedMonth))}</h4>
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