import { Image, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col style={{ marginTop: "8em" }} md>
          <Row>
            <h3>Welcome to My Portfolio</h3>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col md="auto">
              I'm a software developer with a passion for learning and creating software for actual use.
              Explore my work experience and studies to learn a bit more about my background and skills.
            </Col>
          </Row>
          <Row>
            <Col md="auto" style={{ marginTop: "2em" }}>
              <a href="https://www.linkedin.com/in/mari-anne-eerikainen" target="_blank" rel="noreferrer">LinkedIn</a>
            </Col>
          </Row>
        </Col>
        <Col md="auto">
          <Image src="/img/me.png" fluid className="mb-3 me-image" style={{ maxWidth: "400px" }} />
        </Col>
      </Row>
    </Container>
  );
}
export default Home;