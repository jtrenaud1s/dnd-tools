import { useState, ReactNode } from "react";
import TabsComponent from "./components/TabsComponent";
import Offcanvas from "./components/Offcanvas";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const offcanvasWidth = 350;

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            width: showOffcanvas ? `calc(100% - ${offcanvasWidth}px)` : "100%",
            transition: "transform 0.3s ease-in-out",
          }}>
          {children}
        </div>
        <Offcanvas title="My Offcanvas" side="right" backdrop={false}>
          <TabsComponent />
        </Offcanvas>
      </div>
    </>
  );
};

export default Layout;
