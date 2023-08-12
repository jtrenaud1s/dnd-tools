/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
import { Navbar, Nav, Container, Offcanvas, Tabs, Tab } from "react-bootstrap";
import CharacterForm from "./components/CharacterForm";
import MapForm from "./components/MapForm";

export const OffcanvasContext = createContext();

const Layout = ({ children }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const offcanvasWidth = 350;

  return (
    <OffcanvasContext.Provider value={showOffcanvas}>
      <div style={{ overflow: "hidden" }}>
        {/* Top Navbar */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Brand</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* Main Content */}
        <div
          style={{
            width: showOffcanvas ? `calc(100% - ${offcanvasWidth}px)` : "100%",
            transition: "transform 0.3s ease-in-out",
          }}>
          {children}
        </div>

        {/* Tools Tab */}
        <div
          className={`tools-tab ${showOffcanvas ? "expanded" : ""}`}
          onClick={() => setShowOffcanvas(!showOffcanvas)} // Toggle the offcanvas state
        >
          Tools
        </div>

        {/* Offcanvas */}
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="end"
          backdrop={false}
          style={{ width: `${offcanvasWidth}px` }}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">
              <Tab eventKey="add" title="Character">
                <CharacterForm />
              </Tab>
              <Tab eventKey="map" title="Map">
                <MapForm />
              </Tab>
              <Tab eventKey="initiative" title="Initiative Roll">
                {/* Initiative roll form */}
              </Tab>
            </Tabs>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </OffcanvasContext.Provider>
  );
};

export default Layout;
