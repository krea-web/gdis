import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import ChiSiamo from "./pages/ChiSiamo";
import PrenotaOra from "./pages/PrenotaOra";
import NoleggioCostaSmeralda from "./pages/NoleggioCostaSmeralda";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/chisiamo" element={<ChiSiamo />} />
            <Route path="/prenotaora" element={<PrenotaOra />} />
            <Route path="/noleggio-in-costa-smeralda" element={<NoleggioCostaSmeralda />} />
            <Route path="/flotta/fiat-panda" element={<FiatPandaPage />} />
            <Route path="/flotta/honda-sh" element={<HondaScooterPage />} />
            <Route path="/flotta/yamaha-raptor" element={<YamahaQuadPage />} />
            <Route path="/flotta/mercedes-classe-a180d" element={<MercedesA180dPage />} />
            <Route path="/localita/noleggio-porto-cervo" element={<PortoCervoPage />} />
            <Route path="/localita/noleggio-san-teodoro" element={<SanTeodoroPage />} />
            <Route path="/localita/noleggio-san-pantaleo" element={<SanPantaleoPage />} />
            <Route path="/localita/noleggio-porto-rotondo" element={<PortoRotondoPage />} />
            <Route path="/localita/noleggio-golfo-aranci" element={<GolfoAranciPage />} />
            <Route path="/localita/noleggio-baja-sardinia" element={<BajaSardiniaPage />} />
            <Route path="/localita/noleggio-olbia" element={<OlbiaPage />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
