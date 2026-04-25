import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import BackgroundGrid from "@/components/BackgroundGrid";
import CookieBanner from "@/components/CookieBanner";
import { Outlet, useLocation } from "react-router-dom";
import { organizationSchema, websiteSchema } from "@/lib/siteSchema";

const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>
      <BackgroundGrid />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget />
      <MobileStickyCTA />
      <CookieBanner />
    </div>
  );
};

export default Layout;
