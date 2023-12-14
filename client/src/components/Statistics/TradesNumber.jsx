import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { Container } from "react-bootstrap"
import { FaRegClosedCaptioning } from "react-icons/fa"
import { useSelector } from "react-redux"


const TradeNumber = ()=>{
    const trades = useSelector(state=>state.trades.content)
    const takeProfitTrades = trades.filter(trade => trade.result === 'Take Profit');
    const stopLossTrades = trades.filter (trade => trade.result === 'Stop Loss' );
    const breakEvenTrades = trades.filter(trade => trade.result === 'Break Even')
    const totaleResultTrades = [takeProfitTrades.length, stopLossTrades.length, breakEvenTrades.length]
    const seriesNames = ['Take Profit', 'Stop Loss', 'Break Even'];
    const [dati,setDati] = useState()


    useEffect(()=>{
        setDati({
          
            series: totaleResultTrades,
            options: {
              chart: {
                width: 380,
                type: 'donut',
              },
              dataLabels: {
                enabled: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    show: false,
                  
                  }
                }
              }],
              legend: {
                position: 'bottom',
                offsetY: 0,
                height: 30,
                labels: {
                  colors: ['white', 'white', 'white'], 
                },
                
              },
              labels: seriesNames,
              colors: ['rgb(94,161,59)', 'rgb(213,91,91)', 'rgb(255,193,7)'],
              stroke:{
                width:3,
                colors: 'rgb(33,43,54)'
              },
              plotOptions: {
                pie:{
                  donut:{
                    size:'85%',
                    labels:{
                      show: true,
                      
                      total:{
                        show: true,
                        fontSize:20,
                        color: 'rgb(167,172,176)' 
                      },
                      value:{
                        color: 'white'
                      }
                  
                    }
                  },
           
                  
                }
              },

            },
          
          
          })
    }, [trades])
    return (
        <Container className="darkthemeBgCards rounded-4 boxshadow p-3 h-100">
            <h4 className="darkthemeText ms-3 mt-2 mb-4">Numero di operazioni</h4>
            <div className="d-flex align-items-center justify-content-center">
                <div>
                {dati && (<ReactApexChart options={dati.options} series={dati.series} type="donut" width={380} />)}

                </div>
            </div>
        
        </Container>
        
    )
}


export default TradeNumber