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
import NoleggioCostaSmearalda from "./pages/NoleggioCostaSmearalda";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import FiatPandaPage from "./pages/flotta/FiatPandaPage";
import HondaScooterPage from "./pages/flotta/HondaScooterPage";
import YamahaQuadPage from "./pages/flotta/YamahaQuadPage";

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
            <Route path="/noleggio-in-costa-smeralda" element={<NoleggioCostaSmearalda />} />
            <Route path="/flotta/fiat-panda" element={<FiatPandaPage />} />
            <Route path="/flotta/honda-sh" element={<HondaScooterPage />} />
            <Route path="/flotta/yamaha-raptor" element={<YamahaQuadPage />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
