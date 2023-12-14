import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"



const PerformancePair = (props)=>{
    const trades = useSelector(state=>state.trades.content)
    const colors = ['rgb(130,146,118)']
    const xData = props.strategyData?.params?.pair?.map(el => el) ?? [];

    const [tradeGroups, setTradeGroups] = useState([]);
  
    useEffect(() => {
        const emptyTradeGroups = xData.map(() => []);
        setTradeGroups(emptyTradeGroups);
      }, []);
    
      useEffect(() => {
        setTradeGroups([]);
      
        trades.forEach((trade) => {
          const index = xData.indexOf(trade.pair);
          if (index !== -1) {
            setTradeGroups((prevTradeGroups) => {
              const newTradeGroups = [...prevTradeGroups];
              if (!newTradeGroups[index]) {
                newTradeGroups[index] = {
                  totalReward: 0,
                };
              }
      
              const rewardAsNumber = parseInt(trade.reward, 10);
              newTradeGroups[index].totalReward += rewardAsNumber;
              return newTradeGroups;
            });
          }
        });
      }, [trades]);

    
    
    
    const [dati,setDati] = useState()
    useEffect(()=>{
        const dataForChart = tradeGroups.map(el=> el.totalReward)
        setDati({

          
            series: [{
              data: dataForChart
            }],
            options: {
              chart: {
                height: 350,
                type: 'bar',
                events: {
                  click: function(chart, w, e) {
                    // console.log(chart, w, e)
                  }
                }
              },
              colors: colors,
              plotOptions: {
                bar: {
                  columnWidth: '45%',
                  distributed: true,
                }
              },
              dataLabels: {
                enabled: false
              },
              legend: {
                show: false
              },
              grid: {
                borderColor: '#93A0AB ', 
                strokeDashArray: 2.5, 
              },
              xaxis: {
                categories: xData,
                labels: {
                  style: {
                    colors: colors,
                    fontSize: '12px'
                  }
                },
                axisBorder: {
                  color: 'transparent', 
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
          
          
          })
    },[tradeGroups])


    return (
    <Container className="darkthemeBgCards boxshadow rounded-4 p-3">
        <h4 className="darkthemeText ms-3 mt-2 mb-4">Performance per Pair</h4>
        <div>
            {dati && (  <ReactApexChart options={dati.options} series={dati.series} type="bar" height='300px' /> )}
           
        </div>
    </Container>    
    )
}

export default PerformancePair