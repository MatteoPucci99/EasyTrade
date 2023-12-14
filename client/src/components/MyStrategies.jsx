import { useState } from "react"
import {  Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import SingleStrategy from "./SingleStrategy"
import StrategyFilter from "./StrategyFilter"
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";


const MyStrategies = ()=>{
    const navigate = useNavigate()
   
   
    const strategies = useSelector(state=>state.strategy.content)
    console.log(strategies)
    const [search,setSearch] = useState('')
    const handleSearch = (search)=>setSearch(search)
   


    return (

        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}>
        <Container>
             <Row className="mt-3 d-flex justify-content-between">
                <Col className="ps-0" xs={12} sm={6}>
                 <StrategyFilter setSearch={handleSearch}/>
                </Col>
                <Col className='d-flex justify-content-end custom-margin' xs={12} sm={6}>
                 <button  className="align-self-end d-flex align-items-center save" style={{height:'38px'}}  onClick={()=>{navigate('/createstrategy')}}> <IoMdAdd className="me-2" style={{fontSize:'1.15em'}}/>Nuova strategia</button>
                </Col>
            </Row>
            <Row className="mt-3 ">
                {strategies.length > 0 ? (strategies.filter((s)=>s.params.name.toLowerCase().includes(search)).map((strategy,index) => (
                    <Col key={index} xs={12} lg={4}md={6}  className="darkthemeBgHover rounded-4 p-3 me-2 mt-3 boxshadow width">
                        <Link to={`/createstrategy/${strategy._id}`} className="text-decoration-none darkthemeText">
                            <SingleStrategy singleStrategy={strategy} key={strategy._id} />
                        </Link>
                        
                    </Col>))) : (null)
                }

            </Row>
        </Container>
        </motion.div>
    )
}

export default MyStrategies