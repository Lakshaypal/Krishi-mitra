import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Camera, 
  Scan, 
  Leaf, 
  AlertTriangle, 
  CheckCircle,
  Volume2,
  Loader2,
  RefreshCw,
  Droplets,
  Bug,
  Pill
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { HologramBadge } from '@/components/ui/HologramBadge';

interface DiagnosisResult {
  plant: string;
  disease: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  symptoms: string[];
  remedies: {
    organic: string[];
    chemical: string[];
  };
  prevention: string[];
}

// Mock diagnosis result
const mockDiagnosis: DiagnosisResult = {
  plant: 'Tomato',
  disease: 'Early Blight (Alternaria solani)',
  severity: 'medium',
  confidence: 94,
  symptoms: [
    'Dark brown circular spots with concentric rings',
    'Yellowing of leaves around spots',
    'Spots start on lower/older leaves',
    'Lesions may have a target-like appearance'
  ],
  remedies: {
    organic: [
      'Neem oil spray (2ml/L water)',
      'Copper-based fungicide',
      'Baking soda solution (1 tbsp/gallon)',
      'Remove and destroy infected leaves'
    ],
    chemical: [
      'Mancozeb 75% WP @ 2.5g/L',
      'Chlorothalonil @ 2g/L',
      'Azoxystrobin 23% SC @ 1ml/L'
    ]
  },
  prevention: [
    'Use disease-free seeds',
    'Maintain proper plant spacing',
    'Water at the base, avoid wetting leaves',
    'Rotate crops every 2-3 years',
    'Apply mulch to prevent soil splash'
  ]
};

export function DiagnosisPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResult(mockDiagnosis);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
  };

  const severityColors = {
    low: 'success',
    medium: 'warning',
    high: 'error'
  } as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
            <Scan className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            Crop <span className="hologram-text">Diagnosis</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload a photo of your crop leaf and get instant AI-powered disease detection 
          with detailed remedies in your language.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard variant="strong" hover={false} className="h-full">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Upload Leaf Image
            </h2>

            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all group"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                >
                  <Upload className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Drop your image here</h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse files
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, WEBP up to 10MB
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Selected crop"
                    className="w-full h-64 object-cover"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4" />
                        </motion.div>
                        <p className="text-lg font-medium">Analyzing...</p>
                        <p className="text-sm text-muted-foreground">
                          Vision Agent processing your image
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  {!result && (
                    <NeonButton 
                      onClick={handleAnalyze} 
                      disabled={isAnalyzing}
                      className="flex-1"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Scan className="w-5 h-5" />
                          Analyze Crop
                        </>
                      )}
                    </NeonButton>
                  )}
                  <NeonButton variant="ghost" onClick={handleReset}>
                    <RefreshCw className="w-5 h-5" />
                    Reset
                  </NeonButton>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </GlassCard>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* Main Result Card */}
                <GlassCard variant="neon" hover={false}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Identified Plant</span>
                      </div>
                      <h3 className="text-2xl font-bold">{result.plant}</h3>
                    </div>
                    <HologramBadge variant={severityColors[result.severity]}>
                      {result.severity.toUpperCase()} Severity
                    </HologramBadge>
                  </div>

                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <span className="font-semibold">Disease Detected</span>
                    </div>
                    <p className="text-lg">{result.disease}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground">Confidence</span>
                      <div className="text-2xl font-bold text-primary">{result.confidence}%</div>
                    </div>
                    <NeonButton variant="secondary" size="sm">
                      <Volume2 className="w-4 h-4" />
                      Listen in Hindi
                    </NeonButton>
                  </div>
                </GlassCard>

                {/* Symptoms */}
                <GlassCard hover={false}>
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Bug className="w-5 h-5 text-orange-400" />
                    Symptoms
                  </h4>
                  <ul className="space-y-2">
                    {result.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {/* Remedies */}
                <GlassCard hover={false}>
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-emerald-400" />
                    Recommended Remedies
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-2">🌿 Organic</h5>
                      <ul className="space-y-1">
                        {result.remedies.organic.map((remedy, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {remedy}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-secondary mb-2">🧪 Chemical</h5>
                      <ul className="space-y-1">
                        {result.remedies.chemical.map((remedy, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            {remedy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>

                {/* Prevention */}
                <GlassCard hover={false}>
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-cyan-400" />
                    Prevention Tips
                  </h4>
                  <ul className="space-y-2">
                    {result.prevention.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassCard hover={false} className="h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 mx-auto mb-6 rounded-2xl glass flex items-center justify-center"
                    >
                      <Scan className="w-12 h-12 text-primary/50" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                      Waiting for Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Upload a leaf image to get started
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
