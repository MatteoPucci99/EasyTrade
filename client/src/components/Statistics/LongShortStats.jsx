import { Col, Container, Row } from "react-bootstrap"

import LongCircularStats from "./LongCircularStats"
import ShortCircularStats from "./ShortCircularStats"


const LongShortStats = ()=>{
    
    return (
        <Container className="darkthemeBgCards boxshadow rounded-4 mt-3">
            <Row className="row-cols-1 row-cols-sm-2">
                <Col>
                 <LongCircularStats/>
                </Col>
                <Col>
                 <ShortCircularStats/>
                </Col>
            </Row>
        </Container>
    )
}

export default LongShortStats 