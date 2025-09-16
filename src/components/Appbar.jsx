import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Appbar() {
  return (
    <Navbar expand="lg" className="app-bar">
      <Container className="app-bar">
        <Navbar.Brand className="app-bar" href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto app-bar">
            <Nav.Link className="app-bar" href="/work">Work Experience</Nav.Link>
            <Nav.Link className="app-bar" href="/studies">Studies</Nav.Link>
            <Nav.Link className="app-bar" href="/projects">Projects</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;