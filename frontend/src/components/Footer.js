import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

function Footer() {
    return (
      <Container fluid className="footer">
        <Row>
          <Col md="6">
            <p>&copy; 2023 All rights reserved with 🎢✨rollercoaster co.</p>
          </Col>
        </Row>
      </Container>
    );
  }
  export default Footer;
