import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import BuyCar from "./pages/BuyCar";
import SellCar from "./pages/SellCar";
import CarDetails from "./pages/CarDetails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import EMICalculator from "./pages/EMICalculator";

import AdminLogin from "./pages/AdminLogin";

// ✅ ADMIN PAGES
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import BuyCars from "./admin/BuyCars";
import SellRequests from "./admin/SellRequests";

// THEME & UTILS
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      defaultTheme="light"
      storageKey="autohub-theme"
      attribute="class"
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Index />} />
            <Route path="/buy" element={<BuyCar />} />
            <Route path="/sell" element={<SellCar />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/contact" element={<Contact />} />

            {/* ADMIN AUTH */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* ADMIN PANEL (NESTED) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="buy-cars" element={<BuyCars />} />
              <Route path="sell-requests" element={<SellRequests />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
