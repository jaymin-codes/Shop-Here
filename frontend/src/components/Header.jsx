import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

import logo from "../assets/logo.png";

function Header() {
  const {cartItems} = useSelector((state) => state.cart); //cart state is from store.js
  console.log(cartItems);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="ShopHere" width={50} height={50} />
              <span> </span>
              ShopHere
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  <span> </span>
                  Cart
                  {
                    cartItems.length > 0 && (
                      <Badge pill bg="success" style={{marginLeft:'5px'}}>
                         {cartItems.reduce((acc, crtItem) => acc + crtItem.qty, 0)}
                      </Badge>
                    )
                  }
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser />
                  <span> </span>
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
