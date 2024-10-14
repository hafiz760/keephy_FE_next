import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

interface PersistProviderProps {
  children: React.ReactNode;
}

const PersistProvider: React.FC<PersistProviderProps> = ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

export default PersistProvider;
