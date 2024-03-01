import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import {
  removeTradeAction,
  updateTradeAction,
} from "../redux/actions/singletrade";
import SuccessAlert from "./Alert/SuccessAlert";
import DeleteAlert from "./Alert/DeleteAlert";
import { motion } from "framer-motion";

const History = (props) => {
  const trades = useSelector((state) => state.trades.content);
  const dispatch = useDispatch();
  const [pairSelected, setPairSelected] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(5);
  const [showDelete, setShowDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sendTrade, setSendTrade] = useState({});
  const [typeStatus, setTypeStatus] = useState();
  const [selectedButton, setSelectedButton] = useState("");
  const tradeType = ["Take Profit", "Stop Loss", "Break Even"];
  const [showAlert, setShowAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleDeleteAlert = (input) => {
    setDeleteAlert(input);

    setTimeout(() => {
      setDeleteAlert(!input);
    }, 1000);
  };

  const handleAlert = (input) => {
    setShowAlert(input);

    setTimeout(() => {
      setShowAlert(!input);
    }, 1000);
  };
  const startTradeIndex = currentIndex + 1;
  const endTradeIndex = Math.min(currentIndex + selectedIndex, trades.length);
  const handleNext = () => {
    const nextIndex = currentIndex + selectedIndex;
    setCurrentIndex(nextIndex < trades.length ? nextIndex : currentIndex);
  };
  const handlePrev = () => {
    const prevIndex = currentIndex - selectedIndex;
    setCurrentIndex(prevIndex >= 0 ? prevIndex : currentIndex);
  };
  const showDeleteModal = (trade) => {
    setShowDelete(true);
    setSendTrade(trade);
  };
  const hideDeleteModal = () => {
    setShowDelete(false);
  };
  const deleteTrade = () => {
    dispatch(removeTradeAction(sendTrade, handleDeleteAlert));
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (trade) => {
    setShowModal(true);
    setSendTrade(trade);
    setSelectedButton(trade.type);
  };
  const isValidData = () => {
    if (
      //   sendTrade.strategyId.trim() === '' ||
      sendTrade.pair.trim() === "" ||
      sendTrade.type.trim() === "" ||
      sendTrade.result.trim() === "" ||
      sendTrade.risk.trim() === "" ||
      sendTrade.reward.trim() === "" ||
      sendTrade.date.trim() === ""
    ) {
      return false;
    }

    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isValidData()) {
      alert("Compila tutti i campi richiesti");
      return;
    }
    dispatch(updateTradeAction(sendTrade, handleAlert));
    handleCloseModal();
  };

  useEffect(() => {
    if (typeStatus === "Take Profit") {
      setSendTrade({ ...sendTrade, reward: "" });
    } else if (typeStatus === "Stop Loss") {
      setSendTrade({ ...sendTrade, reward: (-sendTrade.risk).toString() });
    } else {
      setSendTrade({ ...sendTrade, reward: "0" });
    }
  }, [typeStatus]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Se il tipo è "Take Profit", accetta solo numeri positivi
    if (typeStatus === "Take Profit") {
      // Rimuovi il segno meno (se presente) e verifica se è un numero positivo
      if (/^\d*\.?\d*$/.test(value)) {
        setSendTrade({ ...sendTrade, reward: value });
      }
    } else if (typeStatus === "Stop Loss") {
      // Verifica se è un numero negativo
      if (/^-\d*\.?\d*$/.test(value)) {
        setSendTrade({ ...sendTrade, reward: value });
      } else {
        // Se l'input è vuoto, setta reward a una stringa vuota
        setSendTrade({ ...sendTrade, reward: "" });
      }
    }
    // Se il tipo è "Break Even", imposta automaticamente l'esito a zero
    else if (typeStatus === "Break Even") {
      setSendTrade({ ...sendTrade, reward: "0" });
    }
  };

  return (
    <Container className="darkthemeText">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}
      >
        <div className="mt-3">
          <h3>Storico</h3>
          <Row className="darkthemeBgCards boxshadow rounded-4 p-3">
            <h5 className="mt-2">Lista dei trade</h5>
            <Col className="mt-3" style={{ overflowX: "auto" }}>
              <div style={{ width: "1200px" }}>
                <Row className="border-bottom border-secondary">
                  <Col>
                    <p className="fw-bold">Pair</p>
                  </Col>
                  <Col>
                    <p className="fw-bold">Tipo</p>
                  </Col>
                  <Col>
                    <p className="fw-bold">Data</p>
                  </Col>
                  <Col>
                    <p className="fw-bold">Rischio Percentuale</p>
                  </Col>
                  <Col>
                    <p className="fw-bold">Risultato Finale</p>
                  </Col>
                  <Col>
                    <p className="fw-bold">Esito</p>
                  </Col>
                  <Col></Col>
                </Row>
                {trades.length > 0
                  ? trades
                      .slice(currentIndex, currentIndex + selectedIndex)
                      .map((trade) => (
                        <Row
                          className="border-bottom border-secondary hover"
                          style={{ cursor: "pointer" }}
                        >
                          <Col className="mt-3">
                            <p className="fw-semibold">
                              {trade.pair.toUpperCase()}
                            </p>
                          </Col>
                          <Col className="mt-3">
                            <p
                              className={`fw-semibold ${
                                trade.type === "Vendi" ? "sellType" : "buyType"
                              }`}
                            >
                              {trade.type}
                            </p>
                          </Col>
                          <Col className="mt-3">
                            <p className="fw-semibold">{trade.date}</p>
                          </Col>
                          <Col className="mt-3">
                            <p className="fw-semibold">{trade.risk}%</p>
                          </Col>
                          <Col className="mt-3">
                            <p className="fw-semibold">{trade.reward}%</p>
                          </Col>
                          <Col className="mt-3">
                            <p
                              className={`fw-semibold ${
                                trade.result === "Stop Loss"
                                  ? "sl"
                                  : trade.result === "Take Profit"
                                  ? "tp"
                                  : "be"
                              }`}
                            >
                              {trade.result}
                            </p>
                          </Col>
                          <Col className="mt-3 d-flex">
                            <div
                              style={{
                                borderRadius: "50%",
                                height: "30px",
                                width: "30px",
                              }}
                              className="hoverIcon d-flex justify-content-center align-items-center me-2"
                            >
                              <RiPencilFill
                                style={{
                                  fontSize: "1.15em",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleShowModal(trade);
                                }}
                              />
                            </div>
                            <div
                              style={{
                                borderRadius: "50%",
                                height: "30px",
                                width: "30px",
                              }}
                              className="d-flex justify-content-center align-items-center hoverIcon"
                            >
                              <RiDeleteBin5Line
                                style={{
                                  fontSize: "1.15em",
                                  color: "rgb(179,58,60)",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  showDeleteModal(trade);
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      ))
                  : null}
              </div>
            </Col>
            <div>
              <Row className="d-flex justify-content-end mt-3">
                <Col
                  xs={12}
                  sm={5}
                  md={4}
                  lg={3}
                  className="d-flex justify-content-center align-items-center"
                >
                  <p className="mb-0 me-3">Righe per pagina</p>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      className="px-3 py-1"
                      id="dropdown-basic"
                    >
                      {selectedIndex}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setSelectedIndex(5)}>
                        5
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedIndex(10)}>
                        10
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedIndex(15)}>
                        15
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col
                  xs={12}
                  sm={5}
                  md={4}
                  lg={2}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div
                    style={{
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                    }}
                    className="hover d-flex justify-content-center align-items-center"
                  >
                    <GrPrevious
                      style={{ cursor: "pointer" }}
                      onClick={handlePrev}
                    />
                  </div>
                  <p className="mb-0 mx-2">
                    {startTradeIndex}-{endTradeIndex} di {trades.length}
                  </p>
                  <div
                    style={{
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                    }}
                    className="hover d-flex justify-content-center align-items-center"
                  >
                    <GrNext
                      style={{ cursor: "pointer" }}
                      onClick={handleNext}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      </motion.div>
      <Modal show={showDelete} onHide={hideDeleteModal}>
        <Container className="darkthemeBgCards darkthemeText rounded-1 p-3">
          <h4 className="my-3 pb-2 border-bottom border-secondary">
            Rimuovi l'operazione
          </h4>
          <div>
            <span>Sei sicuro di voler rimuovere l'operazione ?</span>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-danger"
              onClick={() => {
                hideDeleteModal();
                deleteTrade();
              }}
            >
              Conferma
            </Button>
          </div>
        </Container>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        {props.singleStrategy ? (
          <Container className="darkthemeBgCards darkthemeText rounded-1">
            <div className="mt-4">
              <h4 className="text-center">
                Modifica l'operazione di <br /> "
                {props.singleStrategy.params.name}"
              </h4>
            </div>
            <Container className="mt-4">
              <form onSubmit={handleFormSubmit}>
                <div className="d-flex justify-content-center">
                  <div id="tradeButtonContainer">
                    <button
                      className={`tradeButton buy ${
                        selectedButton === "Compra" ? "selectedBuy" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSendTrade({ ...sendTrade, type: "Compra" });
                        setSelectedButton("Compra");
                      }}
                    >
                      Compra
                    </button>
                    <button
                      className={`tradeButton sell ${
                        selectedButton === "Vendi" ? "selectedSell" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSendTrade({ ...sendTrade, type: "Vendi" });
                        setSelectedButton("Vendi");
                      }}
                    >
                      Vendi
                    </button>
                  </div>
                </div>

                <Dropdown className="d-flex justify-content-center mt-3">
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    style={{ width: "80%" }}
                    id="dropdown-basic"
                  >
                    {sendTrade.pair}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {props.singleStrategy.params.pair
                      .filter((pair) => pair !== pairSelected)
                      .map((el, index) => {
                        return (
                          <Dropdown.Item
                            key={index}
                            onClick={(e) => {
                              setPairSelected(el);
                              setSendTrade({
                                ...sendTrade,
                                pair: e.target.innerText,
                              });
                            }}
                          >
                            {el}
                          </Dropdown.Item>
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="d-flex justify-content-center mt-3">
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    style={{ width: "80%" }}
                    id="dropdown-basic"
                  >
                    {sendTrade.result}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {tradeType
                      .filter((type) => type !== typeStatus)
                      .map((el, index) => {
                        return (
                          <Dropdown.Item
                            key={index}
                            onClick={(e) => {
                              setTypeStatus(el);
                              setSendTrade({
                                ...sendTrade,
                                result: e.target.innerText,
                              });
                            }}
                          >
                            {el}
                          </Dropdown.Item>
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>

                <div className="d-flex justify-content-center">
                  <div style={{ width: "80%" }} className="d-flex">
                    <div className="input-container mt-3 me-3">
                      <input
                        type="text"
                        placeholder=" "
                        value={props.singleStrategy.params.risk}
                      />
                      <label>Rischio %</label>
                    </div>
                    <div className="input-container mt-3 ">
                      <input
                        type="text"
                        placeholder=" "
                        value={sendTrade ? sendTrade.reward : ""}
                        onChange={handleInputChange}
                      />
                      <label>Esito %</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center ">
                  <div
                    style={{ width: "80%" }}
                    className="input-container mt-3"
                  >
                    <div>
                      {
                        <input
                          type="date"
                          placeholder=" "
                          value={sendTrade.date ? sendTrade.date : ""}
                        />
                      }
                      <label>Data</label>
                    </div>
                  </div>
                </div>
                <Container className="d-flex justify-content-end mt-4 mb-4">
                  <Button variant="outline-success" type="submit">
                    {"Modifica"}
                  </Button>
                </Container>
              </form>
            </Container>
          </Container>
        ) : (
          <Alert variant="danger" className="mb-0">
            Seleziona prima la strategia!
          </Alert>
        )}
      </Modal>
      {showAlert && <SuccessAlert message={"Trade modificato con successo"} />}
      {deleteAlert && (
        <DeleteAlert deleteMessage={"Trade rimosso con successo"} />
      )}
    </Container>
  );
};

export default History;
