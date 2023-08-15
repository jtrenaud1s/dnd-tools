import { useState, ReactNode } from "react";
import TabsComponent from "./components/TabsComponent";
import Offcanvas from "./components/Offcanvas";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div>{children}</div>
        <Offcanvas isOpen={isOpen} setIsOpen={setIsOpen} position="left">
          <TabsComponent />
        </Offcanvas>
      </div>
    </>
  );
};

export default Layout;
