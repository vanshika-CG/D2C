import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Zap, Upload as UploadIcon, Image as ImageIcon } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import LivePreview from '../components/LivePreview';

const CreatePage = () => {
  const [prompt, setPrompt] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
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

  const handleGenerateFromPrompt = () => {
    // Placeholder for AI generation
    const generated = `// Generated React component from prompt: "${prompt}"
import React from 'react';

const GeneratedComponent = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center p-6 glass-card">
        <h1 className="text-3xl font-bold text-primary mb-4">${prompt}</h1>
        <p className="text-muted-foreground">AI-generated UI based on your description</p>
        <button className="btn-cyber mt-4">Get Started</button>
      </div>
    </div>
  );
};

export default GeneratedComponent;`;
    setGeneratedCode(generated);
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
      // Placeholder for AI code generation from image
      const generated = `// Generated React component from image: ${imageFile.name}
import React from 'react';

const GeneratedComponent = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center p-6 glass-card">
        <img src="${URL.createObjectURL(imageFile)}" alt="Uploaded Design" className="max-w-full h-auto mb-4 rounded-lg" />
        <h1 className="text-3xl font-bold text-primary mb-4">Generated UI</h1>
        <p className="text-muted-foreground">AI-generated code from your design</p>
        <button className="btn-cyber mt-4">Deploy</button>
      </div>
    </div>
  );
};

export default GeneratedComponent;`;
      setGeneratedCode(generated);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      // Placeholder for AI code generation from image
      const generated = `// Generated React component from image: ${file.name}
import React from 'react';

const GeneratedComponent = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center p-6 glass-card">
        <img src="${URL.createObjectURL(file)}" alt="Uploaded Design" className="max-w-full h-auto mb-4 rounded-lg" />
        <h1 className="text-3xl font-bold text-primary mb-4">Generated UI</h1>
        <p className="text-muted-foreground">AI-generated code from your design</p>
        <button className="btn-cyber mt-4">Deploy</button>
      </div>
    </div>
  );
};

export default GeneratedComponent;`;
      setGeneratedCode(generated);
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
          <div className="flex flex-col gap-8">
            {/* Prompt Input */}
            <div className="glass-card p-8 border border-primary/30">
              <h2 className="font-orbitron font-bold fluid-text-2xl text-gradient mb-6">
                Generate from Prompt
              </h2>
              <p className="text-muted-foreground mb-4">
                Describe your design idea to generate a live preview.
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
                onClick={handleGenerateFromPrompt}
                disabled={!prompt}
              >
                <Zap className="w-5 h-5" />
                Generate Design
              </motion.button>
            </div>

            {/* Image Upload */}
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
                Upload a design screenshot to generate code and preview.
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

          {/* Live Preview and Generated Code */}
          <div className="glass-card p-8 border border-accent/30">
            <h2 className="font-orbitron font-bold fluid-text-2xl text-gradient mb-6">
              Live Preview & Code
            </h2>
            {generatedCode ? (
              <div className="flex flex-col gap-6">
                <LivePreview code={generatedCode} uploadedFile={uploadedFile} />
                <div className="glass-card p-4 border border-primary/30">
                  <h3 className="font-semibold text-primary mb-3">Generated Code</h3>
                  <pre className="whitespace-pre-wrap text-foreground text-sm font-mono bg-muted/20 p-4 rounded-lg">
                    {generatedCode}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-primary/50" />
                <p>Enter a prompt or upload an image to see a live preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;