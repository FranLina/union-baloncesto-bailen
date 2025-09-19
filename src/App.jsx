import Equipos from "./pages/Equipos";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./lib/PageWrapper";

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <Menu />
      <AnimatePresence mode="wait">
        <div className="content container">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/equipos"
              element={
                <PageWrapper>
                  <Equipos />
                </PageWrapper>
              }
            />
            <Route
              path="/partidos"
              element={
                <PageWrapper>
                  <h2>Partidos próximamente</h2>
                </PageWrapper>
              }
            />
            <Route
              path="/entrenamientos"
              element={
                <PageWrapper>
                  <h2>Entrenamientos próximamente</h2>
                </PageWrapper>
              }
            />
            <Route
              path="/cronicas"
              element={
                <PageWrapper>
                  <h2>Crónicas</h2>
                </PageWrapper>
              }
            />
          </Routes>
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
