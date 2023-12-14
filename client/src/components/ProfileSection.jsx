import { Col, Container, Row } from "react-bootstrap"
import avatar from '../imgs/avatar.png'
import { Link } from "react-router-dom"



const ProfileSection = (props)=>{
    return (
        <Container>
            <Row className="darkthemeText">
                <Col className="d-flex align-items-center justify-content-center border border-secondary rounded-4 mx-2">
                    <div>
                        <img src={avatar} width={100}  alt="avatar" />
                    </div>
                    <div>
                        
                        <p className="mb-0 text-center fs-5">Matteo Pucci</p>
                        <Link id="logout" to="/" className="text-decoration-none text-secondary" onClick={()=>props.handleLogin(false)}>
                            <p className="mb-0 text-center">Log Out</p>                        
                        </Link>
                   </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileSection