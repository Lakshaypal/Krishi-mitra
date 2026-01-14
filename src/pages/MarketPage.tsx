import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  BarChart3, 
  Volume2,
  ArrowRight,
  IndianRupee,
  Calendar,
  MapPin
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { HologramBadge } from '@/components/ui/HologramBadge';

interface PriceData {
  date: string;
  price: number;
}

interface MarketResult {
  crop: string;
  market: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  recommendation: 'sell' | 'wait';
  confidence: number;
  priceHistory: PriceData[];
  analysis: string;
}

const mockMarketData: MarketResult = {
  crop: 'Tomato',
  market: 'Nashik APMC',
  currentPrice: 3500,
  previousPrice: 3200,
  trend: 'up',
  recommendation: 'wait',
  confidence: 87,
  priceHistory: [
    { date: 'Jan 7', price: 2800 },
    { date: 'Jan 8', price: 2950 },
    { date: 'Jan 9', price: 3100 },
    { date: 'Jan 10', price: 3050 },
    { date: 'Jan 11', price: 3200 },
    { date: 'Jan 12', price: 3350 },
    { date: 'Jan 13', price: 3500 },
  ],
  analysis: 'Prices have shown a strong upward momentum (+25% in 7 days). Based on historical patterns and current supply-demand dynamics, prices are expected to peak in 2-3 days. Recommend waiting for optimal selling point.'
};

const popularCrops = [
  'Tomato', 'Onion', 'Potato', 'Wheat', 'Rice', 'Cotton', 'Soybean', 'Sugarcane'
];

export function MarketPage() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [result, setResult] = useState<MarketResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPrice = async (crop: string) => {
    setSelectedCrop(crop);
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResult({ ...mockMarketData, crop });
    setIsLoading(false);
  };

  const maxPrice = result ? Math.max(...result.priceHistory.map(d => d.price)) : 0;
  const minPrice = result ? Math.min(...result.priceHistory.map(d => d.price)) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            Market <span className="hologram-text">Intelligence</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get real-time mandi prices with AI-powered sell/wait recommendations 
          to maximize your profits.
        </p>
      </motion.div>

      {/* Crop Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <GlassCard variant="strong" hover={false}>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                placeholder="Enter crop name (e.g., Tomato, Onion)"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <NeonButton onClick={() => handleGetPrice(selectedCrop)} disabled={!selectedCrop || isLoading}>
              <BarChart3 className="w-5 h-5" />
              Get Price
            </NeonButton>
          </div>

          {/* Quick Select */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Popular crops:</span>
            {popularCrops.map((crop) => (
              <button
                key={crop}
                onClick={() => handleGetPrice(crop)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  selectedCrop === crop 
                    ? 'bg-primary text-primary-foreground neon-border' 
                    : 'glass hover:neon-border'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Main Price Card */}
          <GlassCard variant="neon" hover={false} className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{result.market}</span>
                </div>
                <h2 className="text-3xl font-bold">{result.crop}</h2>
              </div>
              <NeonButton variant="secondary" size="sm">
                <Volume2 className="w-4 h-4" />
                Listen
              </NeonButton>
            </div>

            {/* Price Display */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-primary/10">
                <span className="text-muted-foreground">Current Price</span>
                <div className="flex items-center gap-2 mt-2">
                  <IndianRupee className="w-8 h-8 text-primary" />
                  <span className="text-4xl font-bold neon-text">{result.currentPrice}</span>
                  <span className="text-muted-foreground">/quintal</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {result.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                  <span className={result.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {result.trend === 'up' ? '+' : '-'}
                    {Math.abs(result.currentPrice - result.previousPrice)} from yesterday
                  </span>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${
                result.recommendation === 'sell' 
                  ? 'bg-green-500/10 border-2 border-green-500/50' 
                  : 'bg-yellow-500/10 border-2 border-yellow-500/50'
              }`}>
                <span className="text-muted-foreground">AI Recommendation</span>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-4xl font-bold ${
                    result.recommendation === 'sell' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {result.recommendation.toUpperCase()}
                  </span>
                  <HologramBadge variant={result.recommendation === 'sell' ? 'success' : 'warning'}>
                    {result.confidence}% confidence
                  </HologramBadge>
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <div className="mb-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                7-Day Price Trend
              </h3>
              <div className="h-48 flex items-end gap-2">
                {result.priceHistory.map((data, i) => {
                  const height = ((data.price - minPrice) / (maxPrice - minPrice)) * 100 + 20;
                  return (
                    <motion.div
                      key={data.date}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div 
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary relative group cursor-pointer"
                        style={{ height: '100%' }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-bold text-primary">₹{data.price}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">{data.date}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Analysis */}
            <div className="p-4 rounded-xl bg-muted/30">
              <h4 className="font-bold mb-2">Market Analysis</h4>
              <p className="text-muted-foreground">{result.analysis}</p>
            </div>
          </GlassCard>

          {/* Side Cards */}
          <div className="space-y-6">
            <GlassCard>
              <h3 className="font-bold mb-4">Price Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">7-Day High</span>
                  <span className="font-bold text-green-400">₹{maxPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">7-Day Low</span>
                  <span className="font-bold text-red-400">₹{minPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">7-Day Avg</span>
                  <span className="font-bold">
                    ₹{Math.round(result.priceHistory.reduce((a, b) => a + b.price, 0) / result.priceHistory.length)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Trend</span>
                  <HologramBadge variant={result.trend === 'up' ? 'success' : 'error'}>
                    {result.trend === 'up' ? '↑ Bullish' : '↓ Bearish'}
                  </HologramBadge>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-bold mb-4">Other Markets</h3>
              <div className="space-y-3">
                {['Mumbai APMC', 'Pune APMC', 'Kolhapur Mandi'].map((market) => (
                  <div key={market} className="flex justify-between items-center p-3 rounded-xl bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all group">
                    <span>{market}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!result && !isLoading && (
        <GlassCard hover={false} className="max-w-2xl mx-auto text-center py-16">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-6 rounded-2xl glass flex items-center justify-center"
          >
            <BarChart3 className="w-12 h-12 text-primary/50" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Check Market Prices</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Select a crop to view current mandi prices and get AI-powered 
            recommendations on when to sell.
          </p>
        </GlassCard>
      )}
    </div>
  );
}
