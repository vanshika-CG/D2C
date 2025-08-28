import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Globe, Heart, ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const FooterTile = () => {
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
          delay: 0.8,
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-white' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-cyan-400' },
    { icon: Globe, label: 'Website', href: '#', color: 'hover:text-green-400' },
  ];

  const navLinks = [
    { label: 'Create', href: '/create' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ];

  return (
    <motion.div
      ref={tileRef}
      className="bento-item bento-item-wide glass-card border border-border/30"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 opacity-90" />
      
      <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-orbitron font-bold fluid-text-xl text-gradient mb-2">
              DesignFlow AI
            </h3>
            <p className="text-muted-foreground fluid-text-sm">
              Transform designs into code with AI precision
            </p>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-primary" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-primary fluid-text-base mb-4">Quick Links</h4>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.label}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors fluid-text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-secondary fluid-text-base mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`p-2 rounded-lg bg-muted/10 border border-border ${social.color} transition-colors`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-accent fluid-text-base mb-4">About</h4>
            <p className="text-muted-foreground fluid-text-sm">
              DesignFlow AI empowers creators to build stunning applications effortlessly.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>by the DesignFlow team</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 DesignFlow AI. All rights reserved.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FooterTile;