import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logoApp from '../assets/images/z4396452935094_a8e5c1bb43736a1a2822125411ec3d44.jpg'
 

const Header = (props) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand 
                        href="/"
                    >
                        <img
                            src={logoApp}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        React-Bootstrap
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" activeKey={'/'}>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/users">Manage Users</Nav.Link>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/Logout">
                                    Logout
                                </NavDropdown.Item>
                         </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header