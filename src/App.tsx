import React, { useState } from 'react';
import Films from './components/Films';
import About from './components/About';
import { Row, Col, Nav, Card, Container } from 'reactstrap';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { GoTriangleRight } from 'react-icons/go';
import Hamburger from 'hamburger-react';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="App">
      <Router>
        <Container fluid className="vh-100">
          <Row>
            <div className="d-md-none d-flex flex-row justify-content-between">
              <Hamburger toggled={mobileMenuOpen} toggle={setMobileMenuOpen} size={20} />
              <p className="m-2 text-right">Star Wars Films App</p>
            </div>
            {mobileMenuOpen && (
              <Col xs="12" className="d-md-none">
                {/* Mobile Menu */}
                <Card className="border-0 shadow my-1 py-3 px-5">
                  <Nav>
                    <NavLink className={({isActive}) => `me-4 d-flex justify-content-between py-1 ${isActive ? 'fw-bold' : ''}`} to="/about">
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
            )}
            <Col xs="12" md="3" className="bg-light px-5 d-none d-md-block">
              {/* Desktop Menu */}
              <Card className="border-0 shadow my-5 py-3 px-5">
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
            <Col xs="12" md="9" className="vh-100">
              <Routes>
                <Route path="/" element={<Films />} />
                <Route path="about" element={<About />} />
                <Route path="films" element={<Films />} />
                <Route path="*" element={<Navigate to="about" />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
