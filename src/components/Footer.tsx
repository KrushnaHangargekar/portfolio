import { motion } from "framer-motion";
import { Heart, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo/Name */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">KH</span>
            <span className="text-muted-foreground">Krushna Rajendra Hangargekar</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>and</span>
            <Code className="w-4 h-4 text-primary" />
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => {
              const element = document.getElementById('home');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;