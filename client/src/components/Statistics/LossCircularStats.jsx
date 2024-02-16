import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useSelector } from "react-redux"



const LossCircularStats = ()=>{

  const trades = useSelector(state=>state.trades.content)
  //Filtro i trade in base al result "Stop Loss" e "Break Even"
  const stopLossTrades = trades.filter(trade => trade.result === 'Stop Loss' || trade.result === 'Break Even');
  //Calcolo la percentuale dei trade perdenti (vengono considerati perdenti anche quelli chiusi in pari)
  const winRate = (stopLossTrades.length / trades.length * 100).toFixed(2)
 

  const [dati, setDati] = useState();

  useEffect(()=>{
    setDati({
      series: [winRate],
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
                offsetY: -10,
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
     
        colors: ['rgb(213,91,91)'],
        labels: [''],
      },
    })
  },[trades])

  return (
    <div className="d-flex">
      <div style={{width:'60%'}}>
        {dati && (<ReactApexChart options={dati.options} series={dati.series} type="radialBar" height={180} />)}


      </div>
      <div className="d-flex flex-column justify-content-center">
        <h6 className="darkthemeText" style={{color:'rgb(167,172,176)'}}>Operazioni perse</h6>
        <h3 className="darkthemeText text-center">{stopLossTrades.length}</h3>
      </div>
    </div>
  );
}

export default LossCircularStats