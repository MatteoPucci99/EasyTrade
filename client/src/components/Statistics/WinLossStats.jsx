import { Col, Container, Row } from "react-bootstrap"
import WinCircularStats from "./WinCircularStats"
import LossCircularStats from "./LossCircularStats"


const WinLossStats = ()=>{
    
    return (
        <Container className="darkthemeBgCards boxshadow rounded-4" >
            <Row className="row-cols-2">
                <Col>
                 <WinCircularStats/>
                </Col>
                <Col>
                 <LossCircularStats/>
                </Col>
            </Row>
        </Container>
    )
}

export default WinLossStats 