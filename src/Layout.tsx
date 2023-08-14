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
        <button
          className="absolute left-0 top-10 bg-green-600 text-white rounded px-4 py-1 z-450"
          onClick={() => setIsOpen(true)}>
          Toggle
        </button>
        <Offcanvas
          title="test"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          side="right">
          <TabsComponent />
        </Offcanvas>
      </div>
    </>
  );
};

export default Layout;
