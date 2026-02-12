import { createContext, useContext, useState, ReactNode } from "react";

export type TransitionMode = "inline" | "morph" | "takeover" | "radial";

interface TransitionModeContextType {
  mode: TransitionMode;
  setMode: (mode: TransitionMode) => void;
  showLegend: boolean;
  setShowLegend: (show: boolean) => void;
}

const TransitionModeContext = createContext<TransitionModeContextType | undefined>(undefined);

export function TransitionModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<TransitionMode>("inline");
  const [showLegend, setShowLegend] = useState(false);

  return (
    <TransitionModeContext.Provider value={{ mode, setMode, showLegend, setShowLegend }}>
      {children}
    </TransitionModeContext.Provider>
  );
}

export function useTransitionMode() {
  const context = useContext(TransitionModeContext);
  if (!context) {
    throw new Error("useTransitionMode must be used within a TransitionModeProvider");
  }
  return context;
}
