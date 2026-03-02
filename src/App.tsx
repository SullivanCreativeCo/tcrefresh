import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TransitionModeProvider } from "./contexts/TransitionModeContext";

const InteractiveMap = lazy(() => import("./pages/InteractiveMap"));
const EstimatorForMSPs = lazy(() => import("./pages/EstimatorForMSPs"));
const RequestDemo = lazy(() => import("./pages/RequestDemo"));
const Insights = lazy(() => import("./pages/Insights"));
const SquawkBox = lazy(() => import("./pages/SquawkBox"));
const SquawkBoxArticle = lazy(() => import("./pages/SquawkBoxArticle"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const GrowthLab = lazy(() => import("./pages/GrowthLab"));

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
        <Route
          path="/squawk-box"
          element={
            <Suspense fallback={null}>
              <SquawkBox />
            </Suspense>
          }
        />
        <Route
          path="/squawk-box/:slug"
          element={
            <Suspense fallback={null}>
              <SquawkBoxArticle />
            </Suspense>
          }
        />
        <Route
          path="/testimonials"
          element={
            <Suspense fallback={null}>
              <Testimonials />
            </Suspense>
          }
        />
        <Route
          path="/growth-lab"
          element={
            <Suspense fallback={null}>
              <GrowthLab />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster theme="dark" position="bottom-right" richColors />
    </BrowserRouter>
  </TransitionModeProvider>
);

export default App;
