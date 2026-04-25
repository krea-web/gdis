import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import ChiSiamo from "./pages/ChiSiamo";
import PrenotaOra from "./pages/PrenotaOra";
import NoleggioCostaSmeralda from "./pages/NoleggioCostaSmeralda";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import FiatPandaPage from "./pages/flotta/FiatPandaPage";
import HondaScooterPage from "./pages/flotta/HondaScooterPage";
import YamahaQuadPage from "./pages/flotta/YamahaQuadPage";
import MercedesA180dPage from "./pages/flotta/MercedesA180dPage";
import PortoCervoPage from "./pages/localita/PortoCervo";
import SanTeodoroPage from "./pages/localita/SanTeodoro";
import SanPantaleoPage from "./pages/localita/SanPantaleo";
import PortoRotondoPage from "./pages/localita/PortoRotondo";
import GolfoAranciPage from "./pages/localita/GolfoAranci";
import BajaSardiniaPage from "./pages/localita/BajaSardinia";
import OlbiaPage from "./pages/localita/Olbia";

const Admin = lazy(() => import("./pages/Admin"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookie = lazy(() => import("./pages/Cookie"));
const Termini = lazy(() => import("./pages/Termini"));
const Contatti = lazy(() => import("./pages/Contatti"));
const NoleggioAeroportoOlbia = lazy(() => import("./pages/NoleggioAeroportoOlbia"));
const NoleggioPortoOlbia = lazy(() => import("./pages/NoleggioPortoOlbia"));
const NoleggioStazioneOlbia = lazy(() => import("./pages/NoleggioStazioneOlbia"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/chisiamo" element={<ChiSiamo />} />
              <Route path="/prenotaora" element={<PrenotaOra />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookie" element={<Cookie />} />
              <Route path="/termini" element={<Termini />} />
              <Route path="/noleggio-auto-in-costa-smeralda" element={<NoleggioCostaSmeralda />} />
              <Route path="/flotta/fiat-panda" element={<FiatPandaPage />} />
              <Route path="/flotta/honda-sh" element={<HondaScooterPage />} />
              <Route path="/flotta/yamaha-raptor" element={<YamahaQuadPage />} />
              <Route path="/flotta/mercedes-classe-a180d" element={<MercedesA180dPage />} />
              <Route path="/noleggio-auto-a-olbia" element={<OlbiaPage />} />
              <Route path="/noleggio-auto-a-porto-cervo" element={<PortoCervoPage />} />
              <Route path="/noleggio-auto-a-san-teodoro" element={<SanTeodoroPage />} />
              <Route path="/noleggio-auto-a-san-pantaleo" element={<SanPantaleoPage />} />
              <Route path="/noleggio-auto-a-porto-rotondo" element={<PortoRotondoPage />} />
              <Route path="/noleggio-auto-a-golfo-aranci" element={<GolfoAranciPage />} />
              <Route path="/noleggio-auto-a-baja-sardinia" element={<BajaSardiniaPage />} />
              <Route path="/noleggio-auto-aeroporto-olbia" element={<NoleggioAeroportoOlbia />} />
              <Route path="/noleggio-auto-porto-olbia" element={<NoleggioPortoOlbia />} />
              <Route path="/noleggio-auto-stazione-olbia" element={<NoleggioStazioneOlbia />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
