import Equipos from "./pages/Equipos";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import EquipoDetalle from "./pages/EquipoDetalle";
import Cronicas from "./pages/Cronicas";
import CronicaDetalle from "./pages/CronicaDetalle";
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
              path="/equipos/:id"
              element={
                <PageWrapper>
                  <EquipoDetalle />
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
                  <Cronicas />
                </PageWrapper>
              }
            />
            <Route
            path="/cronicas/:id"
            element={
              <PageWrapper>
                <CronicaDetalle />
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
