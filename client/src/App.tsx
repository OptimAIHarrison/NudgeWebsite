import { Toaster } from "@/components/ui/sonner";
import { useEffect } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import HowWeWork from "./pages/HowWeWork";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Testimonials from "./pages/Testimonials";
import Calculator from "./pages/Calculator";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ArticleEditor from "./pages/ArticleEditor";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/how-we-work"} component={HowWeWork} />
      <Route path={"/about"} component={About} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/testimonials"} component={Testimonials} />
      <Route path={"/calculator"} component={Calculator} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/login"} component={Login} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/admin/editor"} component={ArticleEditor} />
      <Route path={"/404"} component={NotFound} />
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
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatBot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
