import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Leaf, 
  Droplets, 
  Wallet, 
  Map,
  Sparkles,
  Volume2,
  CheckCircle,
  ArrowRight,
  IndianRupee,
  Loader2
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { HologramBadge } from '@/components/ui/HologramBadge';

interface CropPlan {
  crop: string;
  allocation: number;
  investment: number;
  expectedReturn: number;
  season: string;
  waterNeed: 'low' | 'medium' | 'high';
  timeline: string;
}

interface StrategyResult {
  totalInvestment: number;
  expectedReturn: number;
  roi: number;
  crops: CropPlan[];
  tips: string[];
}

const mockStrategy: StrategyResult = {
  totalInvestment: 75000,
  expectedReturn: 180000,
  roi: 140,
  crops: [
    {
      crop: 'Tomato',
      allocation: 40,
      investment: 30000,
      expectedReturn: 72000,
      season: 'Rabi',
      waterNeed: 'medium',
      timeline: 'Jan - Apr (90 days)'
    },
    {
      crop: 'Onion',
      allocation: 35,
      investment: 26250,
      expectedReturn: 63000,
      season: 'Kharif',
      waterNeed: 'low',
      timeline: 'Jun - Oct (120 days)'
    },
    {
      crop: 'Green Chilli',
      allocation: 25,
      investment: 18750,
      expectedReturn: 45000,
      season: 'Year-round',
      waterNeed: 'medium',
      timeline: 'Any (75 days)'
    }
  ],
  tips: [
    'Consider drip irrigation to reduce water usage by 40%',
    'Apply for PM-KISAN scheme for additional ₹6000/year',
    'Intercropping onion with tomato can increase land efficiency',
    'Store onions for 2-3 months post-harvest for better prices',
    'Use organic pest control for premium pricing'
  ]
};

export function StrategyPage() {
  const [formData, setFormData] = useState({
    landSize: '',
    budget: '',
    waterAccess: 'medium',
    soilType: 'loamy',
    location: ''
  });
  const [result, setResult] = useState<StrategyResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResult(mockStrategy);
    setIsGenerating(false);
  };

  const waterColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            Crop <span className="hologram-text">Strategy</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get personalized crop planning based on your land, budget, and resources. 
          Maximize your profits with AI-optimized recommendations.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard variant="strong" hover={false}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Your Farm Details
            </h2>

            <div className="space-y-6">
              {/* Land Size */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Map className="w-4 h-4 text-primary" />
                  Land Size (Acres)
                </label>
                <input
                  type="number"
                  value={formData.landSize}
                  onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                  placeholder="e.g., 2"
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Wallet className="w-4 h-4 text-primary" />
                  Budget (₹)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g., 75000"
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Water Access */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Droplets className="w-4 h-4 text-primary" />
                  Water Availability
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, waterAccess: level })}
                      className={`py-3 rounded-xl text-sm font-medium transition-all ${
                        formData.waterAccess === level
                          ? 'bg-primary text-primary-foreground neon-border'
                          : 'glass hover:neon-border'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Soil Type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Soil Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['sandy', 'loamy', 'clay'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, soilType: type })}
                      className={`py-3 rounded-xl text-sm font-medium transition-all ${
                        formData.soilType === type
                          ? 'bg-primary text-primary-foreground neon-border'
                          : 'glass hover:neon-border'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Map className="w-4 h-4 text-primary" />
                  Location / District
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Nashik, Maharashtra"
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <NeonButton 
                onClick={handleGenerate} 
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI is planning...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Crop Plan
                  </>
                )}
              </NeonButton>
            </div>
          </GlassCard>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {result ? (
            <div className="space-y-6">
              {/* Summary Card */}
              <GlassCard variant="neon" hover={false}>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold">Your Optimized Plan</h2>
                  <NeonButton variant="secondary" size="sm">
                    <Volume2 className="w-4 h-4" />
                    Listen
                  </NeonButton>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <span className="text-sm text-muted-foreground">Investment</span>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <IndianRupee className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold">{result.totalInvestment.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-green-500/10">
                    <span className="text-sm text-muted-foreground">Expected Return</span>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <IndianRupee className="w-5 h-5 text-green-400" />
                      <span className="text-2xl font-bold text-green-400">{result.expectedReturn.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/10">
                    <span className="text-sm text-muted-foreground">ROI</span>
                    <div className="mt-1">
                      <span className="text-2xl font-bold text-secondary">{result.roi}%</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Crop Plans */}
              {result.crops.map((crop, i) => (
                <motion.div
                  key={crop.crop}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <GlassCard>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Leaf className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-bold">{crop.crop}</h3>
                          <HologramBadge variant="info">{crop.allocation}% land</HologramBadge>
                        </div>
                        <p className="text-sm text-muted-foreground">{crop.timeline}</p>
                      </div>
                      <span className={`text-sm ${waterColors[crop.waterNeed]}`}>
                        <Droplets className="w-4 h-4 inline mr-1" />
                        {crop.waterNeed} water
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Season</span>
                        <p className="font-medium">{crop.season}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Investment</span>
                        <p className="font-medium">₹{crop.investment.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Return</span>
                        <p className="font-medium text-green-400">₹{crop.expectedReturn.toLocaleString()}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}

              {/* Tips */}
              <GlassCard hover={false}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Pro Tips
                </h3>
                <ul className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          ) : (
            <GlassCard hover={false} className="h-full min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 mx-auto mb-6 rounded-2xl glass flex items-center justify-center relative"
                >
                  <Calendar className="w-12 h-12 text-primary/50" />
                  <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '10s' }} />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                  AI Strategy Agent Ready
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Fill in your farm details and let our AI create an optimized crop plan for maximum profit.
                </p>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  );
}
