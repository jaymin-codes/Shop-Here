import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import logo from "../assets/logo.png";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="ShopHere" width={50} height={50}/>
            <span>    </span>
            ShopHere
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <FaShoppingCart />
                <span>    </span>
                Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <FaUser />
                <span>    </span>
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
