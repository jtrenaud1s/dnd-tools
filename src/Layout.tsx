import { ReactNode, useContext } from "react";
import TabsComponent from "./components/TabsComponent";
import Offcanvas from "./components/Offcanvas";
import InitiativeRoller from "./components/InitiativeHUD/InitiativeRoller";
import SelectedCharacterContext from "./contexts/SelectedCharacterContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { selectedCharacterId } = useContext(SelectedCharacterContext);
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div>{children}</div>
        <Offcanvas position="right" backdrop={false}>
          <TabsComponent />
        </Offcanvas>
        <Offcanvas
          position="bottom"
          backdrop={false}
          transparent
          override={true}
          overrideOpen={selectedCharacterId != null}>
          <InitiativeRoller />
        </Offcanvas>
      </div>
    </>
  );
};

export default Layout;
