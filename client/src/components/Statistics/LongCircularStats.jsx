import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";


const LongCircularStats = ()=>{
    const trades = useSelector(state=>state.trades.content)
    const buyTrades = trades.filter(trade => trade.type === 'Compra');
   
    const buyTradesRate = (buyTrades.length / trades.length * 100).toFixed(2)
   
  
  
    const [dati, setDati] = useState();
  
    useEffect(()=>{
      setDati({
        series: [buyTradesRate],
        options: {
          chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '55%',
              },
              track: {
                background: 'rgb(51,61,73)',
                
              },
              dataLabels: {
                show: true,
                name: {
                  offsetY: 0,
                  show: false,
                  color: '#888',
                  fontSize: '17px',
                },
                value: {
                  color: 'white',
                  fontSize: '18px',
                  show: true,
                  offsetY: 8,
                  fontWeight: 'bold',
                  fontFamily: 'Roboto, sans-serif',
                  

                },
              },
            },
          },
       
          colors: ['rgb(94,161,59)'],
          labels: [''],
        },
      })
    },[trades])
  
    return (
      <div className="d-flex" style={{borderRight:'1px dashed rgb(51,61,73)' }}>
        <div style={{width:'60%'}}>
         {dati && (
           <ReactApexChart options={dati.options} series={dati.series} type="radialBar" height={180} />
  
         )} 
  
        </div>
        <div className="d-flex flex-column justify-content-center">
          <h6 className="darkthemeText" style={{color:'rgb(167,172,176)'}}>Operazioni long:</h6>
          <h3 className="darkthemeText text-center">{buyTrades.length}</h3>
        </div>
      </div>
    );
}

export default LongCircularStats