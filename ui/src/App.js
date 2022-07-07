import React, { useState } from "react";
import { Container, Row, Col, Button, Collapse } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";
import "./components/Sidebar.css"
import { OpenAPIProvider } from 'react-openapi-client';

const apiSpecUrl = process.env['REACT_APP_API_SERVER'] + 'documentation-json'

const App = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(true);

  return (
    <OpenAPIProvider definition={apiSpecUrl}>
    <div className="App">
      <nav>
        <NavigationBar />
      </nav>

      <main>
        <Container fluid style={{ padding: 0 }}>
          <Row noGutters>
            <Collapse in={sideBarIsOpen}>
              <Col xs={2}>
                <Sidebar />
              </Col>
            </Collapse>

            <Col xs={10}>
              <Button
                onClick={() =>
                  setSideBarIsOpen((sideBarIsOpen) => !sideBarIsOpen)
                }
              >
                {sideBarIsOpen ? <>Hide</> : <>Show</>} SideBar
              </Button>
              <span>Test text!!!!..</span>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
    </OpenAPIProvider>
  );
};

export default App;
