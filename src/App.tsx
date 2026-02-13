import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TransitionModeProvider } from "./contexts/TransitionModeContext";

const InteractiveMap = lazy(() => import("./pages/InteractiveMap"));

const App = () => (
  <TransitionModeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/interactive-map"
          element={
            <Suspense fallback={null}>
              <InteractiveMap />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TransitionModeProvider>
);

export default App;
