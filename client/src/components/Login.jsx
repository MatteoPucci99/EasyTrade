import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from "framer-motion";

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulazione di un processo di autenticazione lato client
    if (username === 'matteopucci99' && password === 'matteopucciEasytrade99') {      
      props.handleLogin(true)
    } else {
      alert('Credenziali non valide');
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 0.3 }}>
    <Container className="d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
      <Row className="justify-content-center align-items-center" style={{width:'1000px', marginTop:'200px'}}>
        <Col className="darkthemeBgCards rounded-4 boxshadow darkthemeText p-3" xs={10} md={7}>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <h2 className="me-2">Welcome To</h2>
            <h1 id="logo"><span style={{ color: 'rgb(130,146,118)' }}>EASY</span> TRADE</h1>
          </div>
          <form className="d-flex flex-column align-items-center" onSubmit={handleLogin}>
            <div className="my-4 input-container" data-bs-theme="success" style={{ width: '70%' }}>
              <input type="text" placeholder=' ' value={username} onChange={(e) => { setUsername(e.target.value) }} />
              <label>Username</label>
            </div>
            <div className="my-4 input-container" style={{ width: '70%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder=' '
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <label>Password</label>
              <span className="password-toggle showPass" onClick={handleTogglePassword}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            <div style={{ width: '70%' }} className="d-flex justify-content-end my-2">
              <button className="save" type="submit">Login</button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
    </motion.div>
  );
};

export default Login;
