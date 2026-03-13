import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import CheckIn from "./pages/CheckIn";
import Header from "./components/Header";
import WhatsAppFAB from "./components/WhatsAppFAB";
import FreeTicketModal from "./components/FreeTicketModal";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/thankyou-page"} component={ThankYou} />
      <Route path={"/check-in"} component={CheckIn} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <LanguageProvider>
          <TooltipProvider>
            <Header />
            <Toaster />
            <Router />
            <WhatsAppFAB />
            <FreeTicketModal />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
