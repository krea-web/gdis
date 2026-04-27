import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import ProtectedRoute from "./components/ProtectedRoute";

const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));
const PrenotaOra = lazy(() => import("./pages/PrenotaOra"));
const NoleggioCostaSmeralda = lazy(() => import("./pages/NoleggioCostaSmeralda"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FiatPandaPage = lazy(() => import("./pages/flotta/FiatPandaPage"));
const HondaScooterPage = lazy(() => import("./pages/flotta/HondaScooterPage"));
const YamahaQuadPage = lazy(() => import("./pages/flotta/YamahaQuadPage"));
const MercedesA180dPage = lazy(() => import("./pages/flotta/MercedesA180dPage"));
const PortoCervoPage = lazy(() => import("./pages/localita/PortoCervo"));
const SanTeodoroPage = lazy(() => import("./pages/localita/SanTeodoro"));
const SanPantaleoPage = lazy(() => import("./pages/localita/SanPantaleo"));
const PortoRotondoPage = lazy(() => import("./pages/localita/PortoRotondo"));
const GolfoAranciPage = lazy(() => import("./pages/localita/GolfoAranci"));
const BajaSardiniaPage = lazy(() => import("./pages/localita/BajaSardinia"));
const OlbiaPage = lazy(() => import("./pages/localita/Olbia"));
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
