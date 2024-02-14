import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Alert, Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import itLocale from '@fullcalendar/core/locales/it';
import MonthlyProgressBar from "./MonthlyProgressBar";
import { useDispatch, useSelector} from "react-redux";
import { format } from "date-fns";
import { createTradeAction, removeTradeAction, updateTradeAction } from "../../redux/actions/singletrade";
import SuccessAlert from "../Alert/SuccessAlert";
import DeleteAlert from "../Alert/DeleteAlert";
import { motion } from "framer-motion";




const Trading = (props) => {
  const [pairSelected, setPairSelected] = useState()
  const [isClickedEvent, setIsClickedEvent] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedButton, setSelectedButton] = useState('Compra')
  const [showAlert, setShowAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false)
  //Funzione per gestire il componente DeleteAlert che viene chiamato dopo l'eliminazione di un trade.
  //Dopo un secondo l'alert scompare
  const handleDeleteAlert = (input)=>{
    setDeleteAlert(input);   
    setTimeout(() => {
      setDeleteAlert(!input);             
    }, 1000);
  }
  //Funzione per gestire il componente SuccessAlert che viene chiamato dopo la creazione di un trade.
  //Dopo un secondo l'alert scompare
  const handleAlert = (input)=>{
    setShowAlert(input);
    setTimeout(() => {
      setShowAlert(!input);      
    }, 1000);
  }
  const trades = useSelector(state=>state.trades.content)
  const dispatch = useDispatch()
  //Funzione per gestire il click su una data del calendario
  //Vengono recuperate le informazioni sulla data e viene aperto il modale per creare un trade
  const handleDateClick = (info) => {
    const dateOfTheBox = new Date(info.date)
    const formattedData = format(dateOfTheBox, 'yyyy-MM-dd') 
    setSelectedDate(formattedData)
    setShowModal(true); 
  };

  const calendarRef = useRef(null);
  const handleCalendarRef = (calendar) => {
    calendarRef.current = calendar;
  };
  useEffect(() => {
    const handleDatesSet = (arg) => {
      const newMonth = arg.view.currentStart.getMonth() + 1;
      const newYear = arg.view.currentStart.getFullYear();
      setCurrentMonth(newMonth);
      setCurrentYear(newYear)
    };
  
    const calendarApi = calendarRef.current?.getApi();
  
    if (calendarApi) {
      calendarApi.on("datesSet", handleDatesSet);
    }
  
    return () => {
      if (calendarApi) {
        calendarApi.off("datesSet", handleDatesSet);
      }
    };
  }, [setCurrentMonth]);
  
  const currentEvents = trades.filter((trade) => {
    const eventDate = new Date(trade.date);
    const eventMonth = eventDate.getMonth() + 1;
    const eventYear = eventDate.getFullYear();
    return eventMonth === currentMonth && eventYear === currentYear;
  });
  
  currentEvents.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    return dateA - dateB;
  });
     
  const totalProfit = currentEvents.reduce(
    (acc, trade) => acc + parseInt(trade.reward, 10),
    0
  );
   
  const calculateMaxDrawdown = (trades) => {
    let maxDrawdown = 0;
    let currentDrawdown = 0;

    const totalDrawdown = trades.reduce((total, trade) => {
      const reward = parseInt(trade.reward, 10);

      if (!isNaN(reward)) {
          currentDrawdown = Math.min(currentDrawdown + reward, 0);
          maxDrawdown = Math.min(maxDrawdown, currentDrawdown);
      } else {
          console.error(`Errore: Impossibile convertire ${trade.reward} in un numero.`);
      }

      return total;
    }, 0);

    return Math.abs(maxDrawdown);
  };
  
  // Esempio di utilizzo:
  const maxDrawdown = calculateMaxDrawdown(currentEvents);
  console.log(maxDrawdown);
    
      
  const calendarEvents = trades.map(trade => ({
    title: `(${trade.reward}%) ${trade.pair}`,
    start: new Date(trade.date),
    allDay: true,
    type: trade.type,
    strategyId: trade.strategyId,
    result: trade.result,
    risk: trade.risk,
    reward: trade.reward,
    pair: trade.pair,
    _id: trade._id
  }))

  const eventContent = (arg) => {
    if (!arg) {
      return null;
    }     
    const result = arg.event.extendedProps.result;
    const borderRadius = '3px'
    let backgroundColor = 'gray';
    if (result === 'Stop Loss') {
      backgroundColor = 'rgb(185,82,79)';
    } else if (result === 'Take Profit') {
      backgroundColor = 'rgb(94,161,59';
    }
    return (
      <div style={{ backgroundColor, borderRadius, height:'30px', cursor:'pointer' }} className="d-flex align-items-center fw-bold justify-content-between text-truncate">
        {arg.event.title.toUpperCase()}
        <div className="deleteIcon d-flex justify-content-center align-items-center" style={{ borderRadius: '50%', height: '25px', width: '25px' }}>
        <RxCross2 style={{fontSize: '1.1em'}} onClick={()=>showDeleteModal(arg.event)}/>
        </div>
      </div>
    );
  };
      
  const [typeStatus, setTypeStatus] = useState()
  const tradeType = ['Take Profit', 'Stop Loss', 'Break Even']
    
  const handleCloseModal = ()=>{
      setShowModal(false)
      setPairSelected()
      setTypeStatus()
      setSelectedButton('Compra')        
      setIsClickedEvent(false)
  } 
    const [sendData, setSendData] = useState(null);

  useEffect(() => {
    if (props.singleStrategy) {
      setSendData({
        strategyId: props.singleStrategy._id,
        type: 'Compra',
        pair: '',
        result: '',
        risk: props.singleStrategy.params.risk,
        reward: '',
        date: selectedDate,
      });
    }
  }, [props.singleStrategy, selectedDate]);

  const isValidData = () => {
    // Verifica che ogni proprietà richiesta sia compilata
    for (const key in sendData) {
      if (sendData[key].trim() === '') {
        // Se qualche proprietà manca o è vuota, restituisci false
        return false;
      }
    }
    // Se tutte le condizioni sono soddisfatte, restituisci true
    return true;
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isValidData()) {
      alert('Compila tutti i campi richiesti');
      return; 
    }
    if(isClickedEvent){
      console.log('Questi sono i dati inviati',  sendData)
      dispatch(updateTradeAction(sendData, handleAlert))
    } else {
      dispatch(createTradeAction(sendData, handleAlert));

    }
    handleCloseModal(); 
  };

  const deleteEvent = ()=>{
    dispatch(removeTradeAction(sendData, handleDeleteAlert))
  }
  const hideDeleteModal = ()=>{
    setShowDelete(false)
  }
  const showDeleteModal = (event)=>{
    setShowDelete(true)
    const eventDate = event.start
    const formattedDate = format(eventDate, 'yyyy-MM-dd');
    const trade = event.extendedProps
    setSendData({
      strategyId: trade.strategyId,
      type: trade.type,
      pair: trade.pair,
      result: trade.result,
      risk: trade.risk,
      reward: trade.reward,
      date: formattedDate,
      _id: trade._id
     })   
  }
  //Funzione per gestire il click sul evento di una data del calendario
  //Vengono recuperate le informazioni del evento trade e viene settato lo stato con i dati del evento trade appena clickato.
  const handleEventClick = (info)=>{
    const clickedEvent = info.event
    const eventDate = clickedEvent.start;
    const formattedDate = format(eventDate, 'yyyy-MM-dd');
   setIsClickedEvent(true)
   setShowModal(true);
   const trade = clickedEvent.extendedProps
   console.log(trade)
   setSendData({
    strategyId: trade.strategyId,
    type: trade.type,
    pair: trade.pair,
    result: trade.result,
    risk: trade.risk,
    reward: trade.reward,
    date: formattedDate,
    _id: trade._id
   })
  }
  
  useEffect(() => {
    if (isClickedEvent) {
      setSelectedButton(sendData.type || 'Compra');
    }
  }, [isClickedEvent]);
  
  useEffect(() => {
    if(typeStatus === 'Take Profit')
    {setSendData({...sendData, reward: "" });} else if (typeStatus === 'Stop Loss') {
      setSendData({...sendData, reward: (-sendData.risk).toString()})
    } else {
      setSendData({...sendData, reward:'0'})
    }
  }, [typeStatus]);

  const handleInputChange = (e) => {
    const value = e.target.value;
  
    // Se il tipo è "Take Profit", accetta solo numeri positivi
    if (typeStatus === 'Take Profit') {
      // Rimuovi il segno meno (se presente) e verifica se è un numero positivo
      if (/^\d*\.?\d*$/.test(value)) {
        setSendData({ ...sendData, reward: value });
      }
    }
    else if (typeStatus === 'Stop Loss') {
      // Verifica se è un numero negativo
      if (/^-\d*\.?\d*$/.test(value)) {
        setSendData({ ...sendData, reward: value });
      } else {
        // Se l'input è vuoto, setta reward a una stringa vuota
        setSendData({ ...sendData, reward: '' });
      }
    }
    // Se il tipo è "Break Even", imposta automaticamente l'esito a zero
    else if (typeStatus === 'Break Even') {
      setSendData({ ...sendData, reward: '0' });
    }
  };
  

       

   

  return (
    <motion.div
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ delay: 0.2, duration: 0.2 }}>
    <Container>
        <Row>
          {props.singleStrategy ? (<h4 className="darkthemeText mb-0 fw-semibold mt-3">Journal di '{props.singleStrategy.params.name}'</h4>) : <h4 className="darkthemeText mb-0 fw-semibold mt-3">Seleziona una strategia</h4>}
            <Col className="col-12 col-lg-12 col-xl-8 p-3 darkthemeBgCards mt-3 rounded-4 boxshadow  me-3">
            
                <Fullcalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView={"dayGridMonth"}
                  headerToolbar={{
                    start: '',
                    center: "prev,title,next",
                    end: "",
                  }}
                  height={"90vh"}
                  events={calendarEvents}
                  locale={itLocale}
                  hiddenDays={[0, 6]}
                  dateClick={handleDateClick}
                  eventContent={eventContent}
                  ref={handleCalendarRef}
                  eventClick={handleEventClick}
                  handleWindowResize={true}
              

                />
            </Col>
            <Col>            
            <MonthlyProgressBar singleStrategy={props.singleStrategy} totalProfit={totalProfit} maxDrawdown={maxDrawdown} currentMonth={currentMonth} currentYear={currentYear}/>
            </Col>

        </Row>
        
        <Modal show={showModal} onHide={handleCloseModal}>
            {props.singleStrategy ? (
            <Container className="darkthemeBgCards darkthemeText rounded-1">
            <div className="mt-4">
              {isClickedEvent ? (  <h4 className="text-center">
                Modifica l'operazione di <br/> "{props.singleStrategy.params.name}"
                </h4> ) : ( <h4 className="text-center">
                Aggiungi un'operazione a <br/> "{props.singleStrategy.params.name}"
                </h4> )}
              
            
            </div>
            <Container className="mt-4">
                <form onSubmit={handleFormSubmit}>
                    <div className="d-flex justify-content-center">
                        <div id="tradeButtonContainer">
                            <button className={`tradeButton buy ${selectedButton === 'Compra' ? 'selectedBuy' : ''}`} onClick={(e)=>{e.preventDefault();setSendData({...sendData, type:'Compra'}); setSelectedButton('Compra')}}>Compra</button>
                            <button className={`tradeButton sell ${selectedButton === 'Vendi' ? 'selectedSell' : ''}`} onClick={(e)=>{e.preventDefault();setSendData({...sendData, type:'Vendi'}); setSelectedButton('Vendi')}}>Vendi</button>
                        </div>
                    </div>
                                   
                     <Dropdown className="d-flex justify-content-center mt-3">
                      <Dropdown.Toggle variant="outline-secondary" style={{width:'80%'}}id="dropdown-basic">
                      {isClickedEvent ? sendData.pair : (pairSelected || 'Seleziona il pair')}                    
                      </Dropdown.Toggle>
                              
                      <Dropdown.Menu>
                        {props.singleStrategy.params.pair.filter(pair=> pair !== pairSelected).map((el,index)=>{
                         return(
                         <Dropdown.Item key={index} onClick={(e)=>{setPairSelected(el); setSendData({...sendData, pair: e.target.innerText}) }} >{el}</Dropdown.Item>
                         )
                        })}
                      </Dropdown.Menu>
                     </Dropdown>

                     <Dropdown className="d-flex justify-content-center mt-3">
                      <Dropdown.Toggle variant="outline-secondary" style={{width:'80%'}}id="dropdown-basic">
                      {isClickedEvent ? sendData.result : (typeStatus || "Seleziona l'esito")}    
                      
                      </Dropdown.Toggle>
                              
                      <Dropdown.Menu>
                        {tradeType.filter(type=> type !== typeStatus).map((el,index)=>{
                         return(
                         <Dropdown.Item key={index} onClick={(e)=>{setTypeStatus(el); setSendData({...sendData, result: e.target.innerText})}} >{el}</Dropdown.Item>
                         )
                        })}
                      </Dropdown.Menu>
                     </Dropdown>
                
                     <div className="d-flex justify-content-center">
                        <div style={{width:'80%'}} className="d-flex">

                        <div className="input-container mt-3 me-3">
                           
                           <input type="text" placeholder=" " value={props.singleStrategy.params.risk} />
                           <label>Rischio %</label>
                        </div>
                        <div className="input-container mt-3 ">
                           <input type="text" placeholder=" " value={sendData ? sendData.reward : ''} onChange={handleInputChange}/>
                           <label>Esito %</label>

                        </div>
                        </div>

                     </div>
                     <div className="d-flex justify-content-center ">
                        <div style={{width:'80%'}} className="input-container mt-3">
                           <div >
                              {isClickedEvent ? (  <input type="date"  value={sendData.date ? sendData.date : ''}/>) :( <input type="date" placeholder=" "  value={selectedDate ? selectedDate : ''}/>)}
                              <label>Data</label>


                           </div>
                        </div>
                     </div>
            <Container className="d-flex justify-content-end mt-4 mb-4">
              <Button variant="outline-success"  type="submit">
                {isClickedEvent ? 'Modifica' : 'Aggiungi' }
              </Button>
            </Container>
                  
                </form>
            </Container>
            
            </Container>
            ) : (<Alert variant="danger" className="mb-0">Seleziona prima la strategia!</Alert>)}
     
        </Modal>
        <Modal show={showDelete} onHide={hideDeleteModal}>
        <Container className="darkthemeBgCards darkthemeText rounded-1 p-3">
          <h4 className="my-3 pb-2 border-bottom border-secondary">Rimuovi l'operazione</h4>
          <div><span>Sei sicuro di voler rimuovere l'operazione ?</span></div>
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={()=>{deleteEvent();hideDeleteModal()}}>Conferma</Button>
          </div>                 
        </Container>

        </Modal>
      {showAlert && <SuccessAlert message={'Operazione avvenuta con successo'}/>}
      {deleteAlert && <DeleteAlert deleteMessage={'Trade rimosso con successo'}/>}
    </Container>
    </motion.div>
  );
}

export default Trading;