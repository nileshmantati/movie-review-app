// components/Header.jsx
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Header() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
            <Container>
                <Navbar.Brand className="fs-4 fw-bold text-warning">
                    🎬 MovieReviewApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex gap-3 align-items-center">
                        <NavLink to="/" className="nav-link" activeclassname="active-link">
                            Home
                        </NavLink>
                        <NavLink to="/allreviews" className="nav-link" activeclassname="active-link">
                            All Reviews
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
