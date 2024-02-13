import { Alert } from "react-bootstrap"
import { FaCheckCircle } from "react-icons/fa";


const SuccessAlert = (props)=>{
    return (
        <Alert variant="success"  className="alertPosition d-flex align-items-center">
            <FaCheckCircle style={{color:'green', fontSize:'1.2em'}} className="me-2"/>
            <p className="mb-0 fw-bold" style={{color:'darkgreen'}}>{props.message}</p>
        </Alert>
    )
}

export default SuccessAlert