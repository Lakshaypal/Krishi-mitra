import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  Phone, 
  Navigation, 
  Store, 
  Clock,
  Star,
  Loader2
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { HologramBadge } from '@/components/ui/HologramBadge';

interface StoreResult {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  rating: number;
  isOpen: boolean;
  products: string[];
}

const mockStores: StoreResult[] = [
  {
    id: '1',
    name: 'Kisan Agro Center',
    address: 'Main Road, Near Bus Stand, Dist. Nashik',
    distance: '2.3 km',
    phone: '+91 98765 43210',
    rating: 4.5,
    isOpen: true,
    products: ['Neem Oil', 'Copper Fungicide', 'Organic Fertilizers']
  },
  {
    id: '2',
    name: 'Shri Ganesh Fertilizers',
    address: 'Market Yard, Shop No. 45, Nashik',
    distance: '3.8 km',
    phone: '+91 87654 32109',
    rating: 4.2,
    isOpen: true,
    products: ['Mancozeb', 'Urea', 'DAP', 'Pesticides']
  },
  {
    id: '3',
    name: 'Modern Agri Supplies',
    address: 'Industrial Area, MIDC Road, Nashik',
    distance: '5.1 km',
    phone: '+91 76543 21098',
    rating: 4.8,
    isOpen: false,
    products: ['All Agricultural Supplies', 'Drip Irrigation', 'Seeds']
  },
];

const recentSearches = [
  'Neem Oil',
  'Mancozeb 75% WP',
  'Copper Fungicide',
  'Organic Fertilizer',
  'Drip Irrigation Kit'
];

export function SourcingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<StoreResult[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResults(mockStores);
    setIsSearching(false);
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            Local <span className="hologram-text">Sourcing</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find the nearest stores for fertilizers, pesticides, and agricultural supplies 
          based on your diagnosis recommendations.
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto mb-12"
      >
        <GlassCard variant="strong" hover={false}>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for products (e.g., Neem Oil, Mancozeb)"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <NeonButton onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  Find Stores
                </>
              )}
            </NeonButton>
          </div>

          {/* Quick Search Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Quick search:</span>
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => handleQuickSearch(search)}
                className="px-3 py-1 rounded-full text-sm glass hover:neon-border transition-all"
              >
                {search}
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Results */}
      {results.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Store List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold mb-4">
              Found {results.length} stores near you
            </h2>
            
            {results.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Store className="w-5 h-5 text-primary" />
                        <h3 className="font-bold group-hover:text-primary transition-colors">
                          {store.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{store.address}</p>
                    </div>
                    <HologramBadge variant={store.isOpen ? 'success' : 'error'}>
                      <Clock className="w-3 h-3 mr-1" />
                      {store.isOpen ? 'Open' : 'Closed'}
                    </HologramBadge>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Navigation className="w-4 h-4 text-secondary" />
                      <span>{store.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{store.rating}</span>
                    </div>
                    <a
                      href={`tel:${store.phone}`}
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{store.phone}</span>
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {store.products.map((product) => (
                      <span
                        key={product}
                        className="px-2 py-1 rounded-md text-xs bg-primary/10 text-primary"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard variant="strong" hover={false} className="h-full min-h-[500px]">
              <div className="h-full rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center relative overflow-hidden">
                {/* Decorative grid */}
                <div className="absolute inset-0 grid-pattern opacity-30" />
                
                {/* Map placeholder */}
                <div className="text-center relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full glass neon-border flex items-center justify-center"
                  >
                    <MapPin className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Google Maps integration will show store locations with navigation
                  </p>
                  
                  {/* Fake map pins */}
                  <div className="absolute top-20 left-20">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-bounce">
                      <MapPin className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="absolute top-40 right-32">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
                      <MapPin className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="absolute bottom-32 left-40">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-bounce" style={{ animationDelay: '0.4s' }}>
                      <MapPin className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}

      {/* Empty State */}
      {results.length === 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard hover={false} className="max-w-2xl mx-auto text-center py-16">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-6 rounded-2xl glass flex items-center justify-center"
            >
              <Store className="w-12 h-12 text-primary/50" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Find Local Stores</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Search for agricultural products and we'll find the nearest stores 
              that have them in stock.
            </p>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
