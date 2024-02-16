import { format } from "date-fns"
import itLocale from 'date-fns/locale/it';
import { Col, Container, Row } from "react-bootstrap"


const MonthlyProgressBar = (props)=>{
    
   

    //Calcolo in percentuale di totalProfit e maxDrawdow per riempire la progressBar
    const progressBarProfit = Math.min(parseInt((props.totalProfit / props.singleStrategy?.targets.month.profit) * 100),100)
    const progressBarDd = Math.min(parseInt((props.maxDrawdown / props.singleStrategy?.targets.month.dd) * 100),100)
    //Controllo se le progressBar hanno raggiunto l'ampiezza massima
    const isFullWidthProfit = progressBarProfit === 100;
    const isFullWidthDd = progressBarDd === 100;
    //Funzione per convertire la prima lettera in maiuscolo.
    const firstLetterUpperCase = (str)=>{
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    //Formatto la data in MMMM yyyy (dicembre 2023)
    const formattedDate = format(new Date(props.currentYear, props.currentMonth - 1, 1), 'MMMM yyyy', { locale: itLocale });
    //Formatto la stringa in es: Dicembre 2023
    const upperCaseDate = firstLetterUpperCase(formattedDate);


    return (
        <Container className="darkthemeBgCards mt-3 rounded-4 boxshadow" style={{height:'200px'}}>
            <Row className="py-3 row-cols-1">
                <h5 className="darkthemeText text-center mt-2">Track obiettivi di '{upperCaseDate}'</h5>
                
                <Col className="darkthemeText">
                    <div className="d-flex justify-content-between">
                        <div>
                            <span className="fw-semibold">Profitto</span>
                        </div>
                        <div className="fw-bold" style={{color:'rgb(94,161,59)'}}>
                          <span style={{color: props.totalProfit <= 0 ? 'gray' : ''}}>{props.totalProfit}%</span> <span className="me-1">/</span>  
                          {props.singleStrategy ? (props.singleStrategy.targets.month.profit) : (null)}%
                            
                        </div>
                        
                        
                    </div>
                    <div className="progress-container" style={{height:'20px'}}>
                        <div 
                        className={`progress-bar ${isFullWidthProfit ? 'full-width-bar' : ''}`}
                        style={{ width: props.totalProfit <= 0 ? '0%' : `${progressBarProfit}%`, height:'20px'}}>
                           
                        </div>
                    </div>
                </Col>
                <Col className="darkthemeText mt-3">
                    <div className="d-flex justify-content-between">
                        <div>
                            <span className="fw-semibold">Drawdown</span>
                        </div>
                        <div className="fw-bold" style={{color:'rgb(185,82,79)'}}>
                        {props.maxDrawdown}% <span className="me-1">/</span>
                        {props.singleStrategy ? (props.singleStrategy.targets.month.dd) : (null)}%
                        </div>
                        
                    </div>
                    <div className="dd-container" style={{height:'20px'}}>
                        <div  className={`dd-bar ${isFullWidthDd ? 'full-width-bar' : ''} `}
                        style={{ width: `${progressBarDd}%` , height:'20px' }} >
                           
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default MonthlyProgressBar