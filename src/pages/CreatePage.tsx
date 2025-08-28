import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Zap, Upload as UploadIcon } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const CreatePage = () => {
  const [prompt, setPrompt] = useState('');
  const [generated, setGenerated] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(page.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

  const handleGenerate = () => {
    setGenerated(`Generated design from prompt: "${prompt}" (Note: This is a placeholder. In production, integrate with AI API like Lovable's backend.)`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      setUploadedFile(imageFile);
      setGenerated(`Generated code from uploaded image: ${imageFile.name} (Note: This is a placeholder. Integrate with AI for actual code gen.)`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      setGenerated(`Generated code from uploaded image: ${file.name} (Note: This is a placeholder. Integrate with AI for actual code gen.)`);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <h1 className="font-orbitron font-black fluid-text-5xl text-gradient text-center mb-12">
          Create Your Design
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-card p-8 border border-primary/30">
            <h2 className="font-orbitron font-bold fluid-text-2xl text-gradient mb-6">
              Generate from Prompt
            </h2>
            <p className="text-muted-foreground mb-4">
              Describe your design idea, just like in Lovable.
            </p>
            <textarea
              className="w-full h-40 p-4 border border-border rounded-lg bg-muted/20 text-foreground placeholder-muted-foreground resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'A modern todo list app with dark mode and drag-and-drop tasks'"
            />
            <motion.button
              className="btn-cyber w-full mt-4 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              disabled={!prompt}
            >
              <Zap className="w-5 h-5" />
              Generate Design
            </motion.button>
          </div>

          <div 
            className="glass-card p-8 border border-secondary/30"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <h2 className="font-orbitron font-bold fluid-text-2xl text-gradient mb-6">
              Upload Image for Code
            </h2>
            <p className="text-muted-foreground mb-4">
              Upload your design screenshot to generate code.
            </p>
            <div 
              className={`flex-1 border-2 border-dashed rounded-xl transition-all duration-300 h-40 flex items-center justify-center ${
                isDragging ? 'border-primary bg-primary/10 scale-105' : 'border-border hover:border-primary/50'
              }`}
            >
              {uploadedFile ? (
                <div className="text-center">
                  <p className="font-medium text-success mb-2">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Image uploaded successfully
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <UploadIcon className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="font-semibold mb-2">Drop image here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {generated && (
          <div className="mt-12 glass-card p-8 border border-accent/30">
            <h2 className="font-orbitron font-bold fluid-text-2xl text-gradient mb-4">
              Generated Result
            </h2>
            <pre className="whitespace-pre-wrap text-foreground">{generated}</pre>
          </div>
        )}

        <div className="mt-16 text-center">
          <h3 className="font-orbitron font-bold fluid-text-xl text-gradient mb-4">
            Basic UI Template
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Use this basic React + Tailwind template as a starting point for your generated designs:
          </p>
          <pre className="bg-muted/20 p-6 rounded-lg text-left overflow-auto max-w-4xl mx-auto text-sm">
{`import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">Your App</h1>
        <p className="text-muted-foreground mt-2">Build something amazing</p>
      </div>
    </div>
  );
};

export default App;`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;