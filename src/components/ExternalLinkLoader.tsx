import { motion, AnimatePresence } from "framer-motion";

interface ExternalLinkLoaderProps {
  isOpen: boolean;
  url: string;
  onComplete: () => void;
}

const ExternalLinkLoader = ({ isOpen, url, onComplete }: ExternalLinkLoaderProps) => {
  const handleAnimationComplete = () => {
    // Open the URL in a new window
    window.open(url, '_blank', 'noopener,noreferrer');
    // Close the loader after a small delay to let the window open
    setTimeout(onComplete, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            onAnimationComplete={handleAnimationComplete}
            className="relative flex flex-col items-center gap-8"
          >
            {/* Animated Logo/Icon */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-24 h-24">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Inner glowing circle */}
                <motion.div
                  className="absolute inset-2 rounded-full glow"
                  style={{
                    background: "var(--gradient-primary)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px hsl(270 70% 60% / 0.5)",
                      "0 0 60px hsl(320 70% 60% / 0.5)",
                      "0 0 20px hsl(270 70% 60% / 0.5)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* AI icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    KH
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-lg font-medium gradient-text">Opening External Link</span>

              {/* Loading bar */}
              <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExternalLinkLoader;
