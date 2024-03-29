import { Col, Container, Row } from "react-bootstrap"
import MonthlyResult from "./MonthlyResult"
import GeneralObjectives from "./GeneralObjectives"
import WeeklyObjectives from "./WeeklyObjectives"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";


const Objectives = (props)=>{
    const [selectedMonth, setSelectedMonth] = useState()
    //Stato per gestire la visualizzazione di WeeklyObkectives
    const [isWeeklyObjectivesOpen, setWeeklyObjectivesOpen] = useState(false);
    //Funzione da passare come prop a MonthlyResult per gestire il mese selezionato e l'apparizione del componente WeeklyObjectives
    //che mostrerà le settimane operative del mese selezionato.
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
                <Col xs={12} sm={12} md={3} xl={3} className="mt-2">
                    <GeneralObjectives singleStrategy={props.singleStrategy}/>
                </Col>
                <Col xs={12} sm={6} md={5} xl={5} className="mt-2">
                    <MonthlyResult singleStrategy={props.singleStrategy} handleSelectedMonth={handleSelectedMonth}/>
                </Col>
                <Col xs={12} sm={6} md={4} xl={4} className="mt-2">
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