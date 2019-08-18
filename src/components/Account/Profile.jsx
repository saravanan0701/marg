import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Profile = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Container className="mb-5">
        <Row>
          <Col xs="10" lg="12" className="text-center">
            <h4>COMING SOON</h4>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile;
