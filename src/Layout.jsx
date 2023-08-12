/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
import { Offcanvas } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import TabsComponent from "./components/TabsComponent";

export const OffcanvasContext = createContext();

const Layout = ({ children }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const offcanvasWidth = 350;

  return (
    <OffcanvasContext.Provider value={showOffcanvas}>
      <div style={{ overflow: "hidden" }}>
        <NavbarComponent />

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
            <TabsComponent />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </OffcanvasContext.Provider>
  );
};

export default Layout;
