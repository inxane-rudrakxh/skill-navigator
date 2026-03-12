import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import AppFooter from "@/components/AppFooter";
import Home from "@/pages/Home";
import Analyzer from "@/pages/Analyzer";
import Results from "@/pages/Results";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import DashboardPage from "@/pages/DashboardPage";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import type { ResultsData } from "@/components/Dashboard";

const queryClient = new QueryClient();

// Shows DashboardPage for logged-in users, landing page for guests
const RootPage = ({ data }: { data: ResultsData | null }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // avoid flash while auth initializes
  return user ? <DashboardPage data={data} /> : <Home />;
};

const App = () => {
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<RootPage data={resultsData} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<DashboardPage data={resultsData} />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route
                    path="/analyzer"
                    element={<Analyzer setResultsData={setResultsData} />}
                  />
                  <Route path="/results" element={<Results data={resultsData} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <AppFooter />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
