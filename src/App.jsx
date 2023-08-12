import CustomMap from "./components/CustomMap";
import Layout from "./Layout";
import { CharacterProvider } from "./contexts/CharacterContext";
import { SelectedCharacterProvider } from "./contexts/SelectedCharacterContext";
import { MapProvider } from "./contexts/MapContext";

function App() {
  return (
    <CharacterProvider>
      <MapProvider>
        <SelectedCharacterProvider>
          <Layout>
            <div
              style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
              <CustomMap />
            </div>
          </Layout>
        </SelectedCharacterProvider>
      </MapProvider>
    </CharacterProvider>
  );
}

export default App;
