import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const EquityLine = ()=>{

    const trades = useSelector(state=>state.trades.content)
    //Ordino i trades in ordine crescente di data
    const orderedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));
    //Ottengo un array con tutti i reward in ordine di data
    const tradesRewardNum = orderedTrades.map(el=>parseInt(el.reward))

    //Ottengo la somma cumulativa di tutti i reward
    const tradesRewardSum = tradesRewardNum.reduce((acc, value, index) => {
        if (index === 0) {
          // Se è il primo elemento dell'array aggiungo value come primo elemento
          return [...acc, value];
        } else {
          // Altrimenti, aggiungo la somma del valore corrente con l'elemento precedente a value.
          return [...acc, value + acc[index - 1]];
        }
      }, []);
     //Ottengo tutti gli indici dei trades aumentati di 1, per la visualizzazione ordinata dei trade lungo l'asse x del Equity line
      const numberOfTrades = tradesRewardSum.map((value, index) => index + 1);


    const [dati,setDati]=useState()

      useEffect(()=>{
        setDati({
            options: {
              chart: {
                
                type: "area",
                
                zoom: {
                    enabled: false
                  },
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
                opacity: 1,
                gradient: {
                    shadeIntensity: 0,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100],
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgb(130,146,118)', // Colore iniziale
                        opacity: 0
                      },
                      {
                        offset: 100,
                        color:'rgb(130,146,118)', // Colore finale
                        opacity: 0.3
                      }
                    ]
                  }},
                colors: ['rgb(130,146,118)'],
              stroke: {
                curve: 'smooth',
                colors: ['rgb(130,146,118)'],
                width: 3
              },
           
              grid: {
                borderColor: '#93A0AB ', 
                strokeDashArray: 2.5, 
              },
              xaxis: {
                categories: numberOfTrades,
                axisBorder: {
                    color: 'transparent',
                  },
                labels: {
                  style: {
                    colors: '#879199 ',  
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: '#879199 ',  
                  },
                },
              },
            },
            series: [
              {
                name: "P/L%: ",
                data: tradesRewardSum
              }
            ],
           
          })
      },[trades])


    return (
       <div className="darkthemeBgCards mt-3 boxshadow rounded-4 p-3" >
             <h4 className="darkthemeText ms-4 pt-3">Crescita</h4>
         <div style={{height:'500px'}}>
         {dati && (<Chart
            options={dati.options}
            series={dati.series}
            width="100%"
            height='100%'
            type="area"
            
      
              />)}   
        
        </div>   
     
        </div>
  
    )
}

export default EquityLine