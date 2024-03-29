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
  
        // Filtro e raggrupp0 i trade per mese
        const tradesByMonth = trades.reduce((acc, trade) => {
          //Creo la chiave di "ricerca" 
          const monthKey = getMonthFromDateString(trade.date);
          //Se la chiave non viene trovata nell'oggetto la inizializzo e come valore gli do un array vuoto
          if (!acc[monthKey]) {
            acc[monthKey] = [];
          }
          //Inserisco dentro quell'array i trade corrispondenti.
          acc[monthKey].push(trade);
          //Ottengo un oggetto che ha come chiave le date e come valori array dei trades corrispondenti a quel mese.
          return acc;
        }, {});
    
       // Ottengo un array di oggetti, in cui ogni oggetto ha le proprietà month, totalReward e totalDrawdown.
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
             monthlyTotals.sort((a, b) => a.month - b.month);

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