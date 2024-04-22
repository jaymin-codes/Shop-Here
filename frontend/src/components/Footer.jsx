import { Container, Row, Col } from "react-bootstrap";

function Footer() {

  const currentyear = new Date().getFullYear();

  return(
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    <p>Shophere &copy; {currentyear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer;
