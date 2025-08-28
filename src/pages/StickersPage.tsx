import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const stickers = [
  {
    id: 1,
    name: 'Code Spark',
    url: '/stickers/code-spark.png',
    alt: 'Code Spark Sticker',
  },
  {
    id: 2,
    name: 'AI Pixel',
    url: '/stickers/ai-pixel.png',
    alt: 'AI Pixel Sticker',
  },
  {
    id: 3,
    name: 'Design Flow',
    url: '/stickers/design-flow.png',
    alt: 'Design Flow Sticker',
  },
  {
    id: 4,
    name: 'Tech Glow',
    url: '/stickers/tech-glow.png',
    alt: 'Tech Glow Sticker',
  },
];

const StickersPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-orbitron font-bold fluid-text-4xl text-gradient mb-4 tracking-tight">
              DesignFlow AI Stickers
            </h1>
            <p className="fluid-text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Download and use our exclusive stickers to show your love for AI-powered design and coding!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stickers.map((sticker) => (
              <motion.div
                key={sticker.id}
                className="bg-card rounded-lg overflow-hidden shadow-neon hover:shadow-neon-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={sticker.url}
                  alt={sticker.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-orbitron font-semibold text-lg text-foreground">
                    {sticker.name}
                  </h3>
                  <a
                    href={sticker.url}
                    download
                    className="mt-2 inline-block btn-cyber text-sm px-4 py-2 font-semibold rounded-lg"
                  >
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/">
              <motion.button 
                className="btn-cyber text-lg px-8 py-3.5 font-semibold rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StickersPage;