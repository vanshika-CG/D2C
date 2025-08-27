import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';

const ThemeToggleTile = () => {
  const [isDark, setIsDark] = useState(true);
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(tile,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, tile);

    return () => ctx.revert();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    
    // GSAP theme transition animation
    gsap.to(document.documentElement, {
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        document.documentElement.classList.toggle('dark');
      }
    });
  };

  const themes = [
    { name: 'Cyber Cyan', color: '#00FFFF', bg: 'from-cyan-500/20 to-cyan-600/20' },
    { name: 'Neon Pink', color: '#FF00FF', bg: 'from-pink-500/20 to-pink-600/20' },
    { name: 'Electric Purple', color: '#8A2BE2', bg: 'from-purple-500/20 to-purple-600/20' },
    { name: 'Matrix Green', color: '#39FF14', bg: 'from-green-500/20 to-green-600/20' },
  ];

  return (
    <motion.div
      ref={tileRef}
      className="bento-item group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-muted/10 to-accent/10" />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-accent/20 border border-accent/30">
            <Palette className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-orbitron font-bold fluid-text-xl text-gradient">
              Theme Control
            </h3>
            <p className="text-muted-foreground fluid-text-sm">
              Customize your experience
            </p>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {/* Dark/Light Toggle */}
          <div className="glass-card p-4 border border-accent/30">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Mode</span>
              <motion.button
                onClick={toggleTheme}
                className="relative w-12 h-6 bg-border rounded-full p-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                  animate={{ x: isDark ? 0 : 24 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {isDark ? (
                    <Moon className="w-3 h-3 text-background" />
                  ) : (
                    <Sun className="w-3 h-3 text-background" />
                  )}
                </motion.div>
              </motion.button>
            </div>
            <p className="text-xs text-muted-foreground">
              {isDark ? 'Dark mode active' : 'Light mode active'}
            </p>
          </div>

          {/* Color Themes */}
          <div className="glass-card p-4 border border-accent/30">
            <h4 className="font-medium mb-3">Retro Palettes</h4>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme, index) => (
                <motion.button
                  key={theme.name}
                  className={`p-2 rounded-lg border border-border bg-gradient-to-r ${theme.bg} text-xs font-medium text-center transition-all duration-200 hover:border-primary/50`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    boxShadow: `0 0 10px ${theme.color}20` 
                  }}
                >
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-1 border border-white/20"
                    style={{ backgroundColor: theme.color }}
                  />
                  {theme.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <motion.button 
              className="w-full btn-cyber text-sm py-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Theme
            </motion.button>
            <motion.button 
              className="w-full border border-secondary/50 bg-transparent text-secondary px-4 py-2 rounded-lg text-sm hover:bg-secondary/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reset
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThemeToggleTile;