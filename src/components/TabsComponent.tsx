import CharacterForm from "./CharacterForm";
import MapForm from "./MapForm";
import TabPanel from "./TabPanel";

const TabsComponent = (): JSX.Element => {
  return (
    <TabPanel
      tabs={[
        { title: "Character", content: <CharacterForm /> },
        { title: "Map", content: <MapForm /> },
      ]}
    />
  );
};

export default TabsComponent;
