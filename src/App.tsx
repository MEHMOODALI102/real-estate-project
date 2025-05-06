import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Properties from "./pages/Properties";
import AgentSignIn from "./pages/AgentSignIn";
import AgentSignUp from "./pages/AgentSignUp";
import AgentDashboard from "./pages/AgentDashboard";
import UserProfile from "./pages/UserProfile";
import AgentProfile from "./pages/AgentProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/agent-signin" element={<AgentSignIn />} />
          <Route path="/agent-signup" element={<AgentSignUp />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/agent-profile" element={<AgentProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;