import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="mb-4">
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="ms-2 fw-bold">DynamicApp</span>
        </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className={({ isActive }) => 
              `nav-link ${isActive ? 'active fw-bold' : ''}`
            }>
              Home
            </NavLink>
            
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className={({ isActive }) => 
                  `nav-link ${isActive ? 'active fw-bold' : ''}`
                }>
                  Login
                </NavLink>
                <NavLink to="/signup" className={({ isActive }) => 
                  `nav-link ${isActive ? 'active fw-bold' : ''}`
                }>
                  Sign Up
                </NavLink>
              </>
            ) : (
              <Button 
                variant="outline-light" 
                size="sm" 
                className="ms-2 d-flex align-items-center"
                onClick={logout}
              >
                <LogOut size={16} className="me-1" />
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;