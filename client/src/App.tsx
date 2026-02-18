import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import TeamsPage from "@/pages/teams";
import PredictionsPage from "@/pages/predictions";
import MatchDetailsPage from "@/pages/match-details";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/teams" component={TeamsPage} />
      <Route path="/predictions" component={PredictionsPage} />
      <Route path="/match/:id" component={MatchDetailsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
