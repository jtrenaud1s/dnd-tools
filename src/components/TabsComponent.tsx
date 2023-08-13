import { Tabs, Tab } from "react-bootstrap";
import CharacterForm from "./CharacterForm";
import MapForm from "./MapForm";
import InitiativeRoller from "./InitiativeRoller";

const TabsComponent = (): JSX.Element => {
  return (
    <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">
      <Tab eventKey="add" title="Character">
        <CharacterForm />
      </Tab>
      <Tab eventKey="map" title="Map">
        <MapForm />
      </Tab>
      <Tab eventKey="initiative" title="Initiative Roll">
        <InitiativeRoller />
      </Tab>
    </Tabs>
  );
};

export default TabsComponent;
