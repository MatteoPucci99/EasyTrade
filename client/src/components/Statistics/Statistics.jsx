import { Col, Container, Row } from "react-bootstrap"
import EquityLine from "./EquityLine"
import WinLossStats from "./WinLossStats"
import LongShortStats from "./LongShortStats"
import FinalResult from "./FinalResult"
import TradeNumber from "./TradesNumber"
import PerformancePair from "./PerformancePair"
import ProfitFactor from "./ProfitFactor"
import AverageRiskReward from "./AverageRiskReward"
import Expectancy from "./Expectancy"
import { motion } from "framer-motion";


const Statistics = (props)=>{
    return(
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ delay: 0.2, duration: 0.2 }}>
        <Container>
            <Row>
                <Col xs={12}>
                    <EquityLine/>
                </Col>
                <Col xs={12}>
                    <Row>
                        <Col xs={12} md={12} lg={8} className="mt-4" >
                        <WinLossStats/>
                        <LongShortStats/>
                        </Col>
                        <Col xs={12} md={12} lg={4} className="mt-4">
                            <FinalResult/>
                        </Col> 
                                         
                    </Row>
                </Col>
                <Col xs={12} md={12} lg={12} xl={7} className="mt-4">
                    <TradeNumber/>
                </Col>
                <Col xs={12} md={12} lg={12} xl={5} className="mt-4">
                    <PerformancePair strategyData = {props.strategyData}/>
                </Col>
                <Col md={4} className="mt-4">
                    <ProfitFactor/>
                </Col>
                <Col md={4} className="mt-4">
                    <AverageRiskReward/>
                </Col>
                <Col md={4} className="mt-4">
                    <Expectancy/>
                </Col>

                

            </Row>
        </Container>
        </motion.div>
    )
}

export default Statistics