
import  { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { IoSaveSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeStrategyAction, setStrategyAction, updateStrategyAction } from '../redux/actions/strategy'
import {  useNavigate, useParams } from 'react-router-dom'
import { TiDelete } from "react-icons/ti";
import SuccessAlert from './SuccessAlert';
import DeleteAlert from './DeleteAlert';
import { motion } from "framer-motion";

const CreateStrategy = ()=>{
  const [showDelete, setShowDelete] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false)
    const navigate = useNavigate()
    const  { id } = useParams()
    const strategies = useSelector(state=> state.strategy.content)
    const dispatch = useDispatch()
    const [data, setData] = useState({
      params : {
        name: '',
        risk: '',
        pair: [],
      },
      targets: {
        month: {
          profit: '',
          dd:'',
        },
        quarter: {
          profit:'',
          dd:''
        }
      },
      statistics: []
    })

    const isValidData = () => {
      
      if (
        data.params.name.trim() === '' ||
        data.params.risk.trim() === '' ||
        data.params.pair.length === 0 ||
        data.targets.month.profit.trim() === '' ||
        data.targets.month.dd.trim() === '' ||
        data.targets.quarter.profit.trim() === '' ||
        data.targets.quarter.dd.trim() === ''
      ) {
       
        return false;
      }
       
      return true;
    };

    const [currentPair, setCurrentPair] = useState('')
    const addPair = (e)=>{
      e.preventDefault();
      if(currentPair.trim() !== ''){
        setData({
          ...data,
          params:{...data.params, pair:[...data.params.pair, currentPair]}
        })
      }
      setCurrentPair('')
    }

    const handleKeyPress = (e)=>{
      if(e.key === 'Enter'){
        addPair(e)
      }
    }
    
    const handleDeleteAlert = (input)=>{
      setDeleteAlert(input);
 

      
      setTimeout(() => {
        setDeleteAlert(!input);      
        

      }, 1000);
    }

 
    const handleAlert = (input)=>{
      setShowAlert(input);
 

    
      setTimeout(() => {
        setShowAlert(!input);      
        

      }, 1000);
    }


    const handleSubmit = (e)=>{
      e.preventDefault();

      if(!isValidData()){
        alert('Compila tutti i campi richiesti');
        return;
      }
      if(id){
        dispatch(updateStrategyAction(data, handleAlert))
        
      } else {
        
        dispatch(setStrategyAction(data, handleAlert))

        setData({
          params : {
            name: '',
            risk: '',
            pair: [],
          },
          targets: {
            month: {
              profit: '',
              dd:'',
            },
            quarter: {
              profit:'',
              dd:''
            }
          },
          statistics: []
        })

      }
      
    }

    useEffect(()=>{
      if(id && strategies.length > 0){
        const selectedStrategy = strategies.find(strategy=> strategy._id === id)
        if(selectedStrategy){
          setData(selectedStrategy);
        }
      }
    }, [id,strategies])

    const removePair = (indexToRemove)=>{
      setData(prevData => ({
        ...prevData,
        params: {
          ...prevData.params,
          pair: prevData.params.pair.filter((el, index) => index !== indexToRemove)
        }
      }));
    }

    const deleteStrategy = ()=>{
      dispatch(removeStrategyAction(data, handleDeleteAlert))
      setData({
        params : {
          name: '',
          risk: '',
          pair: [],
        },
        targets: {
          month: {
            profit: '',
            dd:'',
          },
          quarter: {
            profit:'',
            dd:''
          }
        },
        statistics: []
      })
      setTimeout(() => {
            
         navigate('/mystrategies')
        

      }, 1200);
    }

    const handleDeleteModal = ()=>{
      setShowDelete(true)
    }
    const hideDeleteModal = ()=>{
      setShowDelete(false)
    }


    
    return (
      <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.2 }}>  
    <Container>
     
      <form onSubmit={handleSubmit}>
        <Row className='mt-3'>
          <Col xs={12} sm={6}>
          {id ? (<div className='ms-3'><h3 className='darkthemeText mb-0'>Dettagli di '{data.params.name}'</h3> <p className='darkthemeText fs-5'>Visualizza i dettagli e modifica la strategia</p></div>) : (<div className='ms-3'><h3 className='darkthemeText mb-0'>Nuova strategia</h3> <p className='darkthemeText fs-5'>Compilare tutti i campi richiesti e cliccare sull'icona salva</p></div>) }

          </Col>
          
          <Col className='d-flex align-items-center justify-content-end' xs={12} sm={6}>
          <button className='me-3 d-flex align-items-center save' type='submit'><IoSaveSharp className='me-2 '/>Salva</button>
          {id && (<button type='button' className='delete me-3 d-flex align-items-center' onClick={()=>{handleDeleteModal()}}><RiDeleteBin5Line className='me-2'/>Elimina</button>)}
          </Col>
        </Row>
        <Row className='mt-3 justify-content-evenly'>
                 
              <Col className='darkthemeText p-3 darkthemeBgCards boxshadow rounded-4' sm={6}  xl={7}>
                {id ? (<h4 className='fw-bold'>Modifica strategia</h4>) : (<h4>Parametri</h4>)}
               
                <div className="my-4 input-container" data-bs-theme="success">
                  <input type="text" placeholder=' ' value={data.params.name}  onChange={(e)=>{setData({...data, params:{...data.params, name: e.target.value}})}} />
                  <label>Nome</label>

                </div>
                <div className="my-4 input-container">
                  <input type="text" placeholder=' ' value={data.params.risk}  onChange={(e)=>{  if (!/^\d*\.?\d*$/.test(e.target.value)) {     return; } setData({...data, params:{...data.params, risk: e.target.value}})}}/>
                <label>Risk di default %</label>

                </div>
                <div className="my-4 input-container">
                  <input type="text" placeholder=' ' value={currentPair}  onChange={(e)=>setCurrentPair(e.target.value)} onKeyDown={handleKeyPress} />
                <label>Lista dei pair</label>

                </div>
                <h4>Lista Pair</h4>
                <div className='d-flex flex-wrap'>
                  {data.params.pair.map((el,index)=>{
                    return (
                      <div key={index} style={{backgroundColor:'rgb(51,61,72)'}} className='me-2 px-3 py-1 rounded-4 d-flex align-items-center mt-2'>
                        <span className='fw-semibold'>
                          {el.toUpperCase()}
                        </span>
                        <TiDelete style={{fontSize:'1.5em', cursor:'pointer'}} className='ms-3 deleteCross' onClick={()=>{
                          removePair(index)
                        }}/>
                      </div>
                    )
                  })}
                </div>
                
              </Col>
              <Col className='darkthemeText p-3 darkthemeBgCards boxshadow rounded-4 widthObjective customMarginCreate' sm={5} xl={4}>
                <h4 className='fw-bold'>Obiettivi di trading</h4>
                <h5 className='text-white-50 mb-0 mt-4'>Mensile</h5>
                  <div className="mb-4 mt-3  input-container">
                  
                    <input type="text" placeholder=' '  value={data.targets.month.profit} onChange={(e)=>{if (!/^\d*\.?\d*$/.test(e.target.value)) { return; } setData({...data, targets:{...data.targets, month:{...data.targets.month, profit:e.target.value}}})}} />
                    <label>Profitto %</label>
                  </div>
                  <div className="my-4 input-container">
                    <input type="text" placeholder=' '  value={data.targets.month.dd} onChange={(e)=>{if (!/^\d*\.?\d*$/.test(e.target.value)) {     return; } setData({...data, targets:{...data.targets, month:{...data.targets.month, dd:e.target.value}}})}} />
                  <label>Drawdown %</label>

                  </div>
                  <h5 className='text-white-50 mb-0'>Settimanale</h5>

                  <div className="mb-4 mt-3 input-container">
                    <input type="text" placeholder=' '  value={data.targets.quarter.profit} onChange={(e)=>{if (!/^\d*\.?\d*$/.test(e.target.value)) {     return; } setData({...data, targets:{...data.targets, quarter:{...data.targets.quarter, profit:e.target.value}}})}}  />
                  <label>Profitto %</label>

                  </div>
                  <div className="my-4 input-container">
                    <input type="text" placeholder=' '   value={data.targets.quarter.dd} onChange={(e)=>{if (!/^\d*\.?\d*$/.test(e.target.value)) {     return; } setData({...data, targets:{...data.targets, quarter:{...data.targets.quarter, dd:e.target.value}}})}}/>
                  <label>Drawdown %</label>

                  </div>
              
              </Col>
        <Modal show={showDelete} onHide={hideDeleteModal}>
          <Container className="darkthemeBgCards darkthemeText rounded-1 p-3">
            <h4 className="my-3 pb-2 border-bottom border-secondary">Rimuovi la strategia</h4>
            <div><span>Sei sicuro di voler rimuovere la strategia ?</span></div>
            <div className="d-flex justify-content-end">
              <Button variant="outline-danger" onClick={()=>{hideDeleteModal();deleteStrategy() }}>Conferma</Button>
            </div>                 
          </Container>

        </Modal>

        </Row>
      </form> 
      {showAlert && <SuccessAlert message={id?'Strategia modificata con successo' : 'Strategia creata con successo'}/>}
      {deleteAlert && <DeleteAlert deleteMessage={'Strategia rimossa con successo'}/>}
        
                 
    </Container>
    </motion.div>    
    )
}

export default CreateStrategy