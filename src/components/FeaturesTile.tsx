import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Palette, Shield, Rocket, Brain } from 'lucide-react';
import { gsap } from 'gsap';

const features = [
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced machine learning algorithms",
    color: "text-cyber-cyan",
    bg: "bg-cyber-cyan/10",
    border: "border-cyber-cyan/30"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Convert designs in seconds",
    color: "text-cyber-green",
    bg: "bg-cyber-green/10",
    border: "border-cyber-green/30"
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description: "Mobile-first approach",
    color: "text-cyber-pink",
    bg: "bg-cyber-pink/10",
    border: "border-cyber-pink/30"
  },
  {
    icon: Palette,
    title: "Pixel Perfect",
    description: "Maintains design integrity",
    color: "text-cyber-purple",
    bg: "bg-cyber-purple/10",
    border: "border-cyber-purple/30"
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Your designs stay private",
    color: "text-cyber-orange",
    bg: "bg-cyber-orange/10",
    border: "border-cyber-orange/30"
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Clean, optimized code",
    color: "text-cyber-blue",
    bg: "bg-cyber-blue/10",
    border: "border-cyber-blue/30"
  }
];

const FeaturesTile = () => {
  const tileRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tile = tileRef.current;
    const cards = cardsRef.current;
    if (!tile || !cards) return;

    const ctx = gsap.context(() => {
      // Tile animation
      gsap.fromTo(tile,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stagger card animations
      gsap.fromTo(cards.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, tile);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={tileRef}
      className="bento-item bento-item-wide"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5" />
      
      <div className="relative z-10 h-full">
        <div className="mb-8">
          <h3 className="font-orbitron font-bold fluid-text-2xl text-gradient mb-2">
            Powerful Features
          </h3>
          <p className="text-muted-foreground fluid-text-base">
            Everything you need to transform designs into production-ready code
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`glass-card p-4 border ${feature.border} group cursor-pointer will-change-transform`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`p-3 rounded-lg ${feature.bg} w-fit mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              
              <h4 className={`font-semibold fluid-text-lg mb-2 ${feature.color}`}>
                {feature.title}
              </h4>
              
              <p className="text-muted-foreground fluid-text-sm">
                {feature.description}
              </p>
              
              <div className="mt-3 h-1 bg-border rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${feature.bg.replace('/10', '/50')} origin-left`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesTile;