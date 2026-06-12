import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import JournalPage from "@/pages/journal";
import JournalEntryPage from "@/pages/journal-entry";
import PillarsPage from "@/pages/pillars";
import PillarEntryPage from "@/pages/pillar-entry";
import DomainsPage from "@/pages/domains";
import DomainEntryPage from "@/pages/domain-entry";
import VoicesPage from "@/pages/voices";
import VoiceEntryPage from "@/pages/voice-entry";
import BeginPage from "@/pages/begin";
import FieldNotesEntryPage from "@/pages/field-notes-entry";
import { RouteProgress } from "@/components/RouteProgress";
import { EASE, PAGE_TRANSITION_DURATION } from "@/lib/animations";

function ScrollToTop() {
  const [location] = useLocation();
  const isPop = useRef(false);

  useEffect(() => {
    const handlePop = () => { isPop.current = true; };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    if (isPop.current) {
      isPop.current = false;
      return;
    }
    if (window.location.hash) {
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function AnimatedRoutes() {
  const [location] = useLocation();
  const shouldReduce = useReducedMotion();

  const variants = {
    initial: { opacity: shouldReduce ? 1 : 0 },
    animate: { opacity: 1 },
    exit: { opacity: shouldReduce ? 1 : 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: PAGE_TRANSITION_DURATION, ease: EASE }}
      >
        <Switch location={location}>
          <Route path="/" component={HomePage} />
          <Route path="/journal" component={JournalPage} />
          <Route path="/journal/:slug" component={JournalEntryPage} />
          <Route path="/pillars" component={PillarsPage} />
          <Route path="/pillars/:slug" component={PillarEntryPage} />
          <Route path="/domains" component={DomainsPage} />
          <Route path="/domains/:slug" component={DomainEntryPage} />
          <Route path="/voices" component={VoicesPage} />
          <Route path="/voices/:slug" component={VoiceEntryPage} />
          <Route path="/field-notes/:slug" component={FieldNotesEntryPage} />
          <Route path="/begin" component={BeginPage} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App({ ssrPath }: { ssrPath?: string } = {}) {
  const base = (import.meta.env?.BASE_URL ?? "/").replace(/\/$/, "");
  return (
    <WouterRouter base={base} {...(ssrPath !== undefined ? { ssrPath } : {})}>
      <ScrollToTop />
      <RouteProgress />
      <AnimatedRoutes />
    </WouterRouter>
  );
}

export default App;
