import { useState, createContext, ReactNode } from "react";
import { Offcanvas } from "react-bootstrap";
import TabsComponent from "./components/TabsComponent";

export const OffcanvasContext = createContext<boolean>(false);

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const offcanvasWidth = 350;

  return (
    <OffcanvasContext.Provider value={showOffcanvas}>
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            width: showOffcanvas ? `calc(100% - ${offcanvasWidth}px)` : "100%",
            transition: "transform 0.3s ease-in-out",
          }}>
          {children}
        </div>
        <div
          className={`tools-tab ${showOffcanvas ? "expanded" : ""}`}
          onClick={() => setShowOffcanvas(!showOffcanvas)} // Toggle the offcanvas state
        >
          Tools
        </div>
        <Offcanvas
          className="offcanvas-theme"
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="end"
          backdrop={false}
          style={{ width: `${offcanvasWidth}px` }}>
          <Offcanvas.Body>
            <TabsComponent />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </OffcanvasContext.Provider>
  );
};

export default Layout;
