import { motion, AnimatePresence } from "framer-motion";
import { Folder, Code2, Briefcase, Mail, Home, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "projects", icon: Folder, label: "Projects" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "contact", icon: Mail, label: "Contact" },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > 100);

      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              KH
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="topNav"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "var(--gradient-primary)", opacity: 0.2 }}
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10 text-sm font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Slider */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40 top-16"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sliding Menu */}
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="md:hidden fixed right-0 top-16 h-[calc(100vh-64px)] w-full max-w-xs glass rounded-l-3xl z-40 flex flex-col p-6"
            >
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Menu
              </h2>

              <div className="flex flex-col gap-3 flex-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative w-full px-6 py-4 rounded-xl flex items-center gap-3 transition-colors text-left ${
                        isActive
                          ? "text-foreground bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-base font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileNav"
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-6 mt-4">
                <p className="text-xs text-muted-foreground">
                  © 2024 Krushna Hangargekar
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;