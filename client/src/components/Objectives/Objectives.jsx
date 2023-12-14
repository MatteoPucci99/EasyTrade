import { Col, Container, Row } from "react-bootstrap"
import MonthlyResult from "./MonthlyResult"
import GeneralObjectives from "./GeneralObjectives"
import WeeklyObjectives from "./WeeklyObjectives"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";


const Objectives = (props)=>{
    const [selectedMonth, setSelectedMonth] = useState()
    const [isWeeklyObjectivesOpen, setWeeklyObjectivesOpen] = useState(false);
    const handleSelectedMonth = (month) => {
        setSelectedMonth(month);
        setWeeklyObjectivesOpen(true);
      };
    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}>
        <Container className="darkthemeText">
            <h4>Obiettivi</h4>
            <Row>
                <Col md={3}>
                    <GeneralObjectives singleStrategy={props.singleStrategy}/>
                </Col>
                <Col md={5}>
                    <MonthlyResult singleStrategy={props.singleStrategy} handleSelectedMonth={handleSelectedMonth}/>
                </Col>
                <Col md={4}>
                    <AnimatePresence>
                        {isWeeklyObjectivesOpen && (
                          <motion.div
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          style={{ transformOrigin: "top" }}
                          >
                            <WeeklyObjectives
                              singleStrategy={props.singleStrategy}
                              selectedMonth={selectedMonth}
                            />
                          </motion.div>
                        )}
                    </AnimatePresence>
                </Col>

            </Row>
        </Container>
        </motion.div>
    )
}

export default Objectives