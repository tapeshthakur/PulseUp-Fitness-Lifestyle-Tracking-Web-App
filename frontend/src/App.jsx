import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useApp } from "./context/AppContext";
import LoadingScreen from "./components/ui/LoadingScreen";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import ToastViewport from "./components/ui/ToastViewport";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ChallengesPage = lazy(() => import("./pages/ChallengesPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const BadgesPage = lazy(() => import("./pages/BadgesPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ActivityPage = lazy(() => import("./pages/ActivityPage"));

function App() {
  const location = useLocation();
  const { loadingSession } = useApp();

  if (loadingSession) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <ProtectedRoute>
                  <ChallengesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/badges"
              element={
                <ProtectedRoute>
                  <BadgesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity"
              element={
                <ProtectedRoute>
                  <ActivityPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <ToastViewport />
    </>
  );
}

export default App;
