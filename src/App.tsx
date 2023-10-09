import React from 'react';
import Films from './components/Films';
import About from './components/About';
import { Row, Col, Nav, Card } from 'reactstrap';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { GoTriangleRight } from "react-icons/go";

const App: React.FC = () => {
  return (
    <div className="App">
    <Router>
      <div className='vh-100'>
        <Row>
          <Col xs="12" md="3" className='bg-light px-5'>
            <Card className='border-0 shadow my-5 py-3 px-5'>
              <Nav vertical>
                <NavLink className={({isActive}) => `d-flex justify-content-between py-1 ${isActive ? 'fw-bold' : ''}`} to="/about">
                  <span>About</span>
                  <span><GoTriangleRight/></span>
                </NavLink>                
                <NavLink className={({isActive}) => `d-flex justify-content-between py-1 ${isActive ? 'fw-bold' : ''}`} to="/films">
                  <span>Films</span>
                  <span><GoTriangleRight/></span>                  
                </NavLink>
              </Nav>
            </Card>
          </Col>
          <Col xs="12" md="9" className='vh-100'> 
            <Routes>
              <Route path="/" element={<Films />} />
              <Route path="about" element={<About />} />
              <Route path="films" element={<Films />} />
              <Route path="*" element={<Navigate to="about" />} />
            </Routes>
          </Col>
        </Row>
      </div>
    </Router>
    </div>
  );
}

export default App;
