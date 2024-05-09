import { Container, Row, Col, Image } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
