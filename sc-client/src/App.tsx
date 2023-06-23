import { useEffect, useState, useRef } from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import socketClusterClient from 'socketcluster-client';


function App() {
  const socketRef = useRef<socketClusterClient.AGClientSocket>();
  useEffect(() => {
    socketRef.current = socketClusterClient.create({
      port: 8000,
    });
    
  }, []);

  return (
    <ThemeProvider>
      <Container>
        <Row>
          <Col>
            <h1 className="mt-4">Debugging Tool</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-body-secondary">Record some shit</p>
            <Button
              onClick={() => {
                const socket = socketRef.current!;
                socket.transmit('customRemoteEvent', 'Record 100 actions');
              }}
            >Record 100 actions</Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Playback</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Button>Send Playback by Interval</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}

export default App
