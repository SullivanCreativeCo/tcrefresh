import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TransitionModeProvider } from "./contexts/TransitionModeContext";

const InteractiveMap = lazy(() => import("./pages/InteractiveMap"));
const EstimatorForMSPs = lazy(() => import("./pages/EstimatorForMSPs"));
const RequestDemo = lazy(() => import("./pages/RequestDemo"));
const Insights = lazy(() => import("./pages/Insights"));

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
        <Route
          path="/estimator-for-msps"
          element={
            <Suspense fallback={null}>
              <EstimatorForMSPs />
            </Suspense>
          }
        />
        <Route
          path="/request-demo"
          element={
            <Suspense fallback={null}>
              <RequestDemo />
            </Suspense>
          }
        />
        <Route
          path="/insights"
          element={
            <Suspense fallback={null}>
              <Insights />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TransitionModeProvider>
);

export default App;
