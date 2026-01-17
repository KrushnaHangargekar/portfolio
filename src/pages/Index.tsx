import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="min-h-screen bg-background overflow-x-hidden pt-16">
        <Navigation />
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
        <AIAssistant />
      </main>
    </>
  );
};

export default Index;