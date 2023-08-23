import MapCanvas from "./components/MapCanvas";
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
              <div className="overflow-hidden h-screen w-screen">
                <MapCanvas />
              </div>
            </Layout>
          </SelectedCharacterProvider>
        </CharacterProvider>
      </MapBoundsProvider>
    </MapURLProvider>
  );
}

export default App;
