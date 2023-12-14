import { Col, Container, Row } from "react-bootstrap"
import { format } from 'date-fns';
import { it } from 'date-fns/locale';


const SingleStrategy = (props)=>{
    return (

       <Container fluid>
        <Row>
            <Col xs={12}>
                <h2 className="text-center">{props.singleStrategy.params.name}</h2>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
                <div className="text-center">
                    <p className="mb-0 me-3 text-secondary">Creata il: </p>
                    <span className="fw-bold">
                    {format(new Date(props.singleStrategy.createdAt), "dd MMMM yyyy", { locale: it })}
                    </span>
                </div>

            </Col>
            <Col xs={12} className="mt-2">
                <div className="justify-content-center d-flex border-bottom border-secondary pb-2">
                <p className="mb-0 me-3 text-secondary">Rischio di default:</p>
                <span className="fw-bold">{props.singleStrategy.params.risk}%</span>
                </div>
            </Col>

            <h5 className="text-center mt-3">Obiettivi di trading</h5>
            <Col xs={6}>
                <div className="mt-2 border border-secondary rounded-4 p-3">
                    <h6 className="text-center text-secondary">MENSILE</h6>
                    <div className="d-flex justify-content-between">
                        <span style={{color:'rgb(94,161,59)'}} className="fw-bold">Profit: </span>
                        <span>{props.singleStrategy.targets.month.profit}%</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span style={{color:'rgb(213,91,91)'}} className="fw-bold">Drawdown: </span>
                        <span>{props.singleStrategy.targets.month.dd}%</span>
                    </div>
                </div>

            </Col>
            <Col xs={6}>
                <div className=" mt-2 border border-secondary rounded-4 p-3">
                    <h6 className="text-center text-secondary">SETTIMANALE</h6>
                    <div className="d-flex justify-content-between">
                        <span style={{color:'rgb(94,161,59)'}} className="fw-bold">Profit: </span>
                        <span>{props.singleStrategy.targets.quarter.profit}%</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span style={{color:'rgb(213,91,91)'}} className="fw-bold">Drawdown: </span>
                        <span>{props.singleStrategy.targets.quarter.dd}%</span>
                    </div>
                </div>
            </Col>
            <Col xs={12} className="mt-2">                
                <h5 className="text-center">Pair:</h5>
                <div className="d-flex flex-wrap">
               
                {props.singleStrategy.params.pair.map(el=>{
                    return (
                        <p className="me-2 px-3 py-1 border border-secondary rounded-4">{el.toUpperCase()}</p>
                    )
                })}
                </div>
            </Col>
 
          
            
        </Row>
       </Container> 
    
    )
}

export default SingleStrategy