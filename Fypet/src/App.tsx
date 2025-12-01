import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Adoption from "./pages/Adoption";
import AnimalDetail from "./pages/AnimalDetail";
import LostPets from "./pages/LostPets";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import Favorites from "./pages/Favorites";
import PublishAnnouncement from "./pages/PublishAnnouncement";


function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/sobre" component={About} />
      <Route path="/contato" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Register} />
      <Route path="/adocao" component={Adoption} />
      <Route path="/adocao/:id" component={AnimalDetail} />
      <Route path="/perdidos" component={LostPets} />
      <Route path="/perfil" component={Profile} />
      <Route path="/favoritos" component={Favorites} />
      <Route path="/publicar" component={PublishAnnouncement} />
      <Route path="/verify-email" component={VerifyEmail} />
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
        defaultTheme="light"
        // switchable
      >
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
