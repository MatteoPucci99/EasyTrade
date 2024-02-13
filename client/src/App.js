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
  useEffect(() => {
    dispatch(getStrategyAction());
  }, []);

  const [strategyData, setStrategyData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (strategyData) {
      dispatch(getTradesByIdAction(strategyData._id));
    }
  }, [strategyData]);

  const handleLogin = (input) => setIsLoggedIn(input);
  const getStrategyData = (data) => setStrategyData(data);
  const canAccessRoutes = strategyData !== null;

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

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

              {/* Sidebar oncanvas 
              {showSidebar && (
                <div className="sidebar-oncanvas">
                  <SideBar
                    getData={getStrategyData}
                    handleLogin={handleLogin}
                  />
                </div>
              )}*/}

              {/* Sfondo trasparente sopra il contenuto principale quando la sidebar è aperta */}
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
