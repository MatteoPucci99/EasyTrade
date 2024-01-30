import { format } from "date-fns";
import it from "date-fns/locale/it";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import ObjectivesProgressBar from "./ObjectivesProgressBar";



const MonthlyResult = (props)=>{
    const trades = useSelector(state=>state.trades.content)
    const [monthlyData, setMonthlyData] = useState([]);
    

    const formatMonthYear = (dateString) => {
        return format(new Date(dateString), "MMMM yyyy", { locale: it }); 
      };


    useEffect(() => {
        // Funzione per ottenere il mese da una data (formato MM/YYYY)
        const getMonthFromDateString = (dateString) => {
          const [month, year] = dateString.split("-");
          return `${month}/${year}`;
        };
  
        // Filtra e raggruppa i trade per mese
        const tradesByMonth = trades.reduce((acc, trade) => {
          const monthKey = getMonthFromDateString(trade.date);
          if (!acc[monthKey]) {
            acc[monthKey] = [];
          }
          acc[monthKey].push(trade);
          return acc;
        }, {});
    
       // Calcola il total reward e total drawdown per ogni mese
       const monthlyTotals = Object.entries(tradesByMonth).map(([month, trades]) => ({
        month,
        totalReward: trades.reduce((total, trade) => total + parseInt(trade.reward, 10), 0),
        totalDrawdown: trades.reduce((maxDrawdown, trade) => {
          const reward = parseInt(trade.reward, 10);
          const currentDrawdown = Math.min(maxDrawdown + reward, 0);
          return Math.min(maxDrawdown, currentDrawdown);
        }, 0),
      }));
       
             // Ordina l'array in base alla data
             monthlyTotals.sort((a, b) => {
               // Confronto delle stringhe delle date nel formato "YYYY/MM"
               if (a.month < b.month) return -1;
               if (a.month > b.month) return 1;
               return 0;
             });
    
        setMonthlyData(monthlyTotals);
      }, [trades]);

      return (
        <Container className="darkthemeBgCards rounded-4 boxshadow">
          <h4 className="text-center pt-3">Storico risultati mensili</h4>
          <Row className="row-cols-1 px-4 pb-4">
            {monthlyData.length > 0 &&
              monthlyData
                .filter((el) => el.totalReward !== 0 || el.totalDrawdown !== 0)
                .reverse()
                .map((el) => (
                  <Col key={el.month} className="border border-secondary rounded-4 mt-3 p-2 hover" onClick={()=>props.handleSelectedMonth(el.month)} style={{cursor:'pointer'}}>
                    <h6 className="fw-bold text-center text-secondary">{formatMonthYear(el.month).toLocaleUpperCase()}</h6>
                    <ObjectivesProgressBar
                      totalProfit={el.totalReward}
                      maxDrawdown={el.totalDrawdown}
                      singleStrategy={props.singleStrategy}
                    />
                  </Col>
                ))}
          </Row>
        </Container>
      );
}

export default MonthlyResult