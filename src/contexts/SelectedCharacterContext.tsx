import { createContext, useState, ReactNode } from "react";

export interface SelectedCharacterContextValue {
  selectedCharacterId: string | null;
  setSelectedCharacterId: (id: string | null) => void;
}

const SelectedCharacterContext = createContext<SelectedCharacterContextValue>({
  selectedCharacterId: null,
  setSelectedCharacterId: () => {},
});

export interface SelectedCharacterProviderProps {
  children: ReactNode;
}

export const SelectedCharacterProvider = ({
  children,
}: SelectedCharacterProviderProps): JSX.Element => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );

  const value: SelectedCharacterContextValue = {
    selectedCharacterId,
    setSelectedCharacterId,
  };

  return (
    <SelectedCharacterContext.Provider value={value}>
      {children}
    </SelectedCharacterContext.Provider>
  );
};

export default SelectedCharacterContext;
