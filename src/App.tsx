import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// App Components
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SafeRoute from "./pages/SafeRoute";
import RiskNews from "./pages/RiskNews";
import SoloFemaleMode from "./pages/SoloFemaleMode";
import NegotiationAssistant from "./pages/NegotiationAssistant";
import ChatBot from "./pages/ChatBot";
import PoliceDashboard from "./pages/PoliceDashboard";
import ProfileComplete from "./pages/ProfileComplete";
import DigitalID from "./pages/DigitalID";
import TripPlanner from "./pages/TripPlanner";

const queryClient = new QueryClient();

// Global App Context for user data and app state
interface AppContextType {
  user: any;
  setUser: (user: any) => void;
  safetyScore: number;
  setSafetyScore: (score: number) => void;
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
  lastTripBlockchainId?: string | null;
  setLastTripBlockchainId: (id: string | null) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [safetyScore, setSafetyScore] = useState(85); // Default good score
  const [currentLocation, setCurrentLocation] = useState("Police Bazaar, Shillong");
  const [lastTripBlockchainId, setLastTripBlockchainId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('EN');

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          user,
          setUser,
          safetyScore,
          setSafetyScore,
          currentLocation,
          setCurrentLocation,
          lastTripBlockchainId,
          setLastTripBlockchainId,
          selectedLanguage,
          setSelectedLanguage,
        }}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/complete-profile" element={<ProfileComplete />} />
                <Route path="/digital-id" element={<DigitalID />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/safe-route" element={<SafeRoute />} />
                <Route path="/risk-news" element={<RiskNews />} />
                <Route path="/solo-female" element={<SoloFemaleMode />} />
                <Route path="/negotiation" element={<NegotiationAssistant />} />
                <Route path="/chatbot" element={<ChatBot />} />
                <Route path="/police" element={<PoliceDashboard />} />
                <Route path="/trip-planner" element={<TripPlanner />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;