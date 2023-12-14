import { Col, Container, Row } from "react-bootstrap"



const GeneralObjectives = (props)=>{
    return (
        <Container className="darkthemeBgCards darkthemeText rounded-4 boxshadow">
            
            <Row className="row-cols-1 p-3">
                <h5 className="text-center">Obiettivi di trading</h5>
                <Col className="mt-3">
                    <h6 className="fw-bold text-center text-secondary">SETTIMANALE</h6>
                    <Row>
                        <Col className="text-center fw-bold">
                            <p className="mb-0" style={{color:'rgb(185,82,79)'}}>Drawdown</p>
                            {props.singleStrategy && (props.singleStrategy.targets.quarter.dd)}%
                        </Col>
                        <Col className="text-center fw-bold">
                            <p className="mb-0" style={{color:'rgb(94,161,59)'}}>Profitto</p>
                            {props.singleStrategy && (props.singleStrategy.targets.quarter.profit)}%

                        </Col>
                    </Row>
                </Col>
                <Col className="mt-2">
                    <h6 className="fw-bold text-center text-secondary">MENSILE</h6>
                        <Row>
                            <Col className="text-center fw-bold">
                                <p className="mb-0" style={{color:'rgb(185,82,79)'}}>Drawdown</p>
                                {props.singleStrategy && (props.singleStrategy.targets.month.dd)}%                                
                            </Col>
                            <Col className="text-center fw-bold">
                                <p className="mb-0" style={{color:'rgb(94,161,59)'}}>Profitto</p>
                                {props.singleStrategy && (props.singleStrategy.targets.month.profit)}% 

                            </Col>
                        </Row>

                </Col>

            </Row>
        </Container>
    )
}

export default GeneralObjectives