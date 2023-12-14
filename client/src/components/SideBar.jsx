import {  useEffect, useState } from "react"
import { Col, Container, Dropdown, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import logo from '../imgs/logo.png'
import { MdCandlestickChart } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import ProfileSection from "./ProfileSection"



const SideBar = (props)=>{

    const strategies = useSelector(state=>state.strategy.content)
    const [strategySelected, setStrategySelected] = useState()
    const [activeLink, setActiveLink] = useState(null);
    const { pathname } = useLocation()
    const [shouldVibrate, setShouldVibrate] = useState(false);
    const [userTriedToNavigate, setUserTriedToNavigate] = useState(false);

    const getActiveLink = () => {
      if (pathname.endsWith("/mystrategies")) {
        return "Le mie strategie";
      } else if (pathname.endsWith("/trading")) {
        return "Trading";
      } else if (pathname.endsWith("/statistics")) {
        return "Statistiche";
      } else if (pathname.endsWith("/history")) {
        return "Storico";
      } else if (pathname.endsWith("/objectives")) {
        return "Obiettivi";
      } else if (pathname.endsWith("/profile")) {
        return "Profilo";
      } else {
        return null;
      }
    };
    useEffect(() => {
      setActiveLink(getActiveLink());
  
      if (userTriedToNavigate) {
        // Imposta shouldVibrate a true quando l'utente prova ad accedere alle altre pagine
        setShouldVibrate(!strategySelected);
  
        // Resetta shouldVibrate dopo 500ms (o qualsiasi valore ritieni appropriato)
        const timeoutId = setTimeout(() => {
          setShouldVibrate(false);
        }, 500);
  
        return () => clearTimeout(timeoutId);
      }
    }, [pathname, strategySelected, userTriedToNavigate]);
    
    const handleLinkClick = () => {
      setUserTriedToNavigate(true);
    };


    return (
    <Container className="rounded-4 my-3 darkthemeBgCards boxshadow " id="sideBar">
        <Row className="row-cols-1">
            <Col className="mt-3 darkthemeText text-center">
              <img src={logo} alt="logo" width={120} />
            </Col>
            <Col className="mt-3 darkthemeText text-center">
                <h2 id="logo"><span  style={{color:'rgb(130,146,118)'}}>EASY</span> TRADE</h2>
                
            </Col>
            <Col className="mt-3">
              <ProfileSection handleLogin={props.handleLogin}/>
            </Col>
           
            <Col className="mt-3 text-center">
              {strategies.length > 0 && (
                 <Dropdown className={`${shouldVibrate ? "vibrate" : ""}`}>
                  <p className={`darkthemeText fw-semibold mb-0 ${strategySelected ? 'fade-out' : 'pulsate'}`}>Seleziona la strategia</p>
                  
                 <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" style={{width:'230px'}}>
                   {strategySelected || 'Strategy'}
                 </Dropdown.Toggle>
                 <Dropdown.Menu>
                  {strategies.filter(strategy=>strategy.params.name !== strategySelected).map((el,index)=>{
                    return(
                      <Dropdown.Item  onClick={()=>{setStrategySelected(el.params.name); props.getData(el)}} key={index}>{el.params.name}</Dropdown.Item>
                    )
                  })}
                 </Dropdown.Menu>
               </Dropdown>
              )}
               
            </Col>
            <Col className="mt-3">
          <ul className="ps-1">
            <Link
              className={`text-decoration-none darkthemeText ${
                activeLink === "Le mie strategie" ? "active" : ""
              }`}
              to="/mystrategies"
              onClick={() => handleLinkClick()}
            >
              <li className="py-2 ps-4">
                <span className="d-flex align-items-center"><MdDashboard className='me-2'/>Le mie strategie</span>
              </li>
            </Link>

            <Link
              className={`text-decoration-none darkthemeText ${
                activeLink === "Trading" ? "active" : ""
              }`}
              to="/trading"
              onClick={() => handleLinkClick()}
            >
              <li className="py-2 ps-4">
                <span className="d-flex align-items-center"><MdCandlestickChart className="me-2"/>Trading</span>
              </li>
            </Link>
            <Link
              className={`text-decoration-none darkthemeText ${
                activeLink === "Statistiche" ? "active" : ""
              }`}
              to="/statistics"
              onClick={() => handleLinkClick()}
            >
              <li className="py-2 ps-4">
                <span className="d-flex align-items-center"><FaChartSimple className="me-2"/>Statistiche</span>
              </li>
            </Link>
            <Link
              className={`text-decoration-none darkthemeText ${
                activeLink === "Storico" ? "active" : ""
              }`}
              to="/history"
              onClick={() => handleLinkClick()}
            >
              <li className="py-2 ps-4">
                <span className="d-flex align-items-center"><FaList className="me-2"/>Storico</span>
              </li>
            </Link>
            <Link
              className={`text-decoration-none darkthemeText ${
                activeLink === "Obiettivi" ? "active" : ""
              }`}
              to="/objectives"
              onClick={() => handleLinkClick()}
            >
              <li className="py-2 ps-4">
                <span className="d-flex align-items-center"><GoGoal className="me-2"/>Obiettivi</span>
              </li>
            </Link>
            {/* <Link
              className={`text-decoration-none darkthemeText ${
                activeLink === "Profilo" ? "active" : ""
              }`}
              to="/profile"
              onClick={() => handleLinkClick()}
            >
              <li className="py-2 ps-4">
                <span>Profilo</span>
              </li>
            </Link> */}
          </ul>
        </Col>
        </Row>
    </Container>

    )
}

export default SideBar