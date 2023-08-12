import CustomMap from "./components/CustomMap";
import Layout from "./Layout";
import { CharacterProvider } from "./contexts/CharacterContext";
import { SelectedCharacterProvider } from "./contexts/SelectedCharacterContext";
import ProviderComposer from "./components/ProviderComposer";
import { MapURLProvider } from "./contexts/MapURLContext";
import { MapBoundsProvider } from "./contexts/MapBoundsContext";

function App() {
  return (
    <ProviderComposer
      contexts={[
        <MapURLProvider key={1} />,
        <MapBoundsProvider key={2} />,
        <CharacterProvider key={3} />,
        <SelectedCharacterProvider key={4} />,
      ]}>
      <Layout>
        <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
          <CustomMap />
        </div>
      </Layout>
    </ProviderComposer>
  );
}

export default App;
