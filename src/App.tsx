import CustomMap from "./components/CustomMap";
import Layout from "./Layout";
import { CharacterProvider } from "./contexts/CharacterContext";
import { SelectedCharacterProvider } from "./contexts/SelectedCharacterContext";
import { MapURLProvider } from "./contexts/MapURLContext";
import { MapBoundsProvider } from "./contexts/MapBoundsContext";

function App(): JSX.Element {
  return (
    <MapURLProvider>
      <MapBoundsProvider>
        <CharacterProvider>
          <SelectedCharacterProvider>
            <Layout>
              <div
                style={{
                  overflow: "hidden",
                  height: "100vh",
                  width: "100vw",
                  zIndex: "-10",
                }}>
                <CustomMap />
              </div>
            </Layout>
          </SelectedCharacterProvider>
        </CharacterProvider>
      </MapBoundsProvider>
    </MapURLProvider>
  );
}

export default App;
