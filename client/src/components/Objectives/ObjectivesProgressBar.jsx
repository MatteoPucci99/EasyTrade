
import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

const ObjectivesProgressBar = (props)=>{
    const trades = useSelector(state=>state.trades.content)
   


    const progressBarProfit = Math.min(parseInt((props.totalProfit / props.singleStrategy?.targets.month.profit) * 100),100)
    const progressBarDd = Math.abs((parseInt((props.maxDrawdown / props.singleStrategy?.targets.month.dd) * 100)))
    const drawdownBar = Math.min((progressBarDd),100)
    console.log('DD:',drawdownBar)
    console.log('PROFIT:',progressBarProfit)
    
    const isFullWidthProfit = progressBarProfit === 100;
    const isFullWidthDd = drawdownBar === 100;
 

    return (
        <Container>
            <Row className="py-3 row-cols-2">
                            
                <Col className="darkthemeText">
                    <div className="d-flex justify-content-center fw-bold">
                      
                        <div style={{color:'rgb(185,82,79)'}}>
                        {Math.abs(props.maxDrawdown)}%/
                        {props.singleStrategy ? (props.singleStrategy.targets.month.dd) : (null)}%
                        </div>
                        
                    </div>
                    <div className="dd-container" style={{height:'15px'}}>
                        <div  className={`dd-bar ${isFullWidthDd ? 'full-width-bar' : ''}`}
                        style={{ width: `${drawdownBar}%`, height:'15px' }} >
                           
                        </div>
                    </div>
                </Col>
                <Col className="darkthemeText">
                    <div className="d-flex justify-content-center fw-bold">
                      
                        <div style={{color:'rgb(94,161,59)'}}>
                          {props.totalProfit}%/  
                          {props.singleStrategy ? (props.singleStrategy.targets.month.profit) : (null)}%
                            
                        </div>
                        
                        
                    </div>
                    <div className="progress-container" style={{height:'15px'}}>
                        <div 
                        className={`progress-bar ${isFullWidthProfit ? 'full-width-bar' : ''}`}
                        style={{ width: `${progressBarProfit}%`, height:'15px' }}>
                           
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default ObjectivesProgressBar