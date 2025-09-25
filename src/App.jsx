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
import Patrocinadores from "./components/Patrocinadores";
import Partidos from "./pages/Partidos";

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
                  <Partidos />
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
      <Patrocinadores />
      <Footer />
    </div>
  );
}

export default App;
