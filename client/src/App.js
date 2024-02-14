import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import CreateStrategy from "./components/Strategy/CreateStrategy";
import "bootstrap/dist/css/bootstrap.min.css";
import MyStrategies from "./components/Strategy/MyStrategies";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./components/SideBar";
import { getStrategyAction } from "./redux/actions/strategy";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Trading from "./components/Trading/Trading";
import { getTradesByIdAction } from "./redux/actions/singletrade";
import Statistics from "./components/Statistics/Statistics";
import History from "./components/History";
import Objectives from "./components/Objectives/Objectives";
import Login from "./components/Login";
import { IoMenuOutline } from "react-icons/io5";
import WidgetTW from "./components/WidgetTW";

function App() {
  const dispatch = useDispatch();
  //Al montaggio del componente App faccio il dispatch di getStrategyAction per rendere disponibile all'applicazione tutti i dati delle strategie
  useEffect(() => {
    dispatch(getStrategyAction());
  }, []);
  //Stato per raccogliere tutti i dati relativi a una strategia.
  const [strategyData, setStrategyData] = useState(null);
  //Stato che viene gestito da handleLogin che verrà passata come prop al componente Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Stato per l'apparizione della sidebar per dispositivi mobile, che viene gestito dalla funzione toggleSidebar
  const [showSidebar, setShowSidebar] = useState(false);

  //In base alla strategia che viene selezionata si ottengono tutti i trade di quella strategia.
  useEffect(() => {
    if (strategyData) {
      dispatch(getTradesByIdAction(strategyData._id));
    }
  }, [strategyData]);

  //Funzione passata come prop al componente Login per gestire l'accesso all'applicazione
  const handleLogin = (input) => setIsLoggedIn(input);
  //Funzione che viene passata come prop al componente SideBar. La descrizione della funzione si trova nel componente SideBar
  const getStrategyData = (data) => setStrategyData(data);
  //canAccessRoutes viene utilizzato per impedire la navigazione in caso in cui non viene selezionata una strategia, perciò strategyData è null.
  const canAccessRoutes = strategyData !== null;
  //Funzione per gestire l'apparizione della Sidebar per dispositivi mobile.
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  //Funzione per chiudere la Sidebar nel momento in cui si clicca un punto a caso del div overlay
  const closeSidebar = () => setShowSidebar(false);

  return (
    <BrowserRouter>
      <Container
        fluid
        className="darkthemeBg pb-5 posCont"
        style={{ minHeight: "100vh" }}
      >
        <WidgetTW />
        {isLoggedIn ? (
          <Row className="ms-1 posRow">
            <Col
              className={`${
                showSidebar ? "onCanvas" : "d-none d-lg-block col-lg-2"
              }`}
              style={{ width: "300px", height: "95vh" }}
            >
              <SideBar
                getData={getStrategyData}
                handleLogin={handleLogin}
                toggleSidebar={showSidebar}
              />
            </Col>
            <Col className="d-lg-none col-12 px-5">
              {/* Icona hamburger per mostrare/nascondere la sidebar */}
              <div className="hamburger-icon" onClick={toggleSidebar}>
                <IoMenuOutline style={{ color: "white" }} />
              </div>

              {/* Sfondo trasparente sopra il contenuto principale quando la sidebar è aperta (la sidebar ha uno z-index superiore rispetto al div overlay)*/}
              {showSidebar && (
                <div className="overlay" onClick={closeSidebar}></div>
              )}
            </Col>
            <Col style={{ height: "100%", width: "69%" }} className="px-5">
              <Routes>
                <Route
                  path="/createstrategy/:id?"
                  element={<CreateStrategy />}
                />
                <Route path="/mystrategies" element={<MyStrategies />} />
                <Route
                  path="/trading"
                  element={
                    canAccessRoutes ? (
                      <Trading singleStrategy={strategyData} />
                    ) : (
                      <Navigate to="/mystrategies" />
                    )
                  }
                />
                <Route path="/" element={<Navigate to="/mystrategies" />} />
                <Route
                  path="/statistics"
                  element={
                    canAccessRoutes ? (
                      <Statistics strategyData={strategyData} />
                    ) : (
                      <Navigate to="/mystrategies" />
                    )
                  }
                />
                <Route
                  path="/history"
                  element={
                    canAccessRoutes ? (
                      <History singleStrategy={strategyData} />
                    ) : (
                      <Navigate to="/mystrategies" />
                    )
                  }
                />
                <Route
                  path="/objectives"
                  element={
                    canAccessRoutes ? (
                      <Objectives singleStrategy={strategyData} />
                    ) : (
                      <Navigate to="/mystrategies" />
                    )
                  }
                />
              </Routes>
            </Col>
          </Row>
        ) : (
          <Login handleLogin={handleLogin} />
        )}
      </Container>
    </BrowserRouter>
  );
}

export default App;
