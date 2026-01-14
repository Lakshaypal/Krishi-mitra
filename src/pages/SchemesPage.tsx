import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Volume2, 
  Mic,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  IndianRupee,
  Calendar,
  Users,
  Building
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { HologramBadge } from '@/components/ui/HologramBadge';

interface Scheme {
  id: string;
  name: string;
  ministry: string;
  benefit: string;
  eligibility: string[];
  documents: string[];
  deadline: string;
  amount: string;
  category: string;
}

const mockSchemes: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN Samman Nidhi',
    ministry: 'Ministry of Agriculture',
    benefit: 'Direct income support of ₹6000 per year in 3 installments',
    eligibility: [
      'Small and marginal farmer families',
      'Combined land holding up to 2 hectares',
      'Valid Aadhaar card linked to bank account'
    ],
    documents: ['Aadhaar Card', 'Land Records', 'Bank Passbook'],
    deadline: 'Ongoing',
    amount: '₹6,000/year',
    category: 'Income Support'
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    ministry: 'Ministry of Agriculture',
    benefit: 'Crop insurance with low premium rates for farmers',
    eligibility: [
      'All farmers including sharecroppers and tenant farmers',
      'Compulsory for loanee farmers',
      'Voluntary for non-loanee farmers'
    ],
    documents: ['Land Records', 'Sowing Certificate', 'Bank Account Details'],
    deadline: 'Season-based',
    amount: 'Variable',
    category: 'Insurance'
  },
  {
    id: '3',
    name: 'Soil Health Card Scheme',
    ministry: 'Department of Agriculture',
    benefit: 'Free soil testing and nutrient-based recommendations',
    eligibility: [
      'All farmers across India',
      'Land ownership not mandatory',
      'No income criteria'
    ],
    documents: ['Aadhaar Card', 'Land Details (if available)'],
    deadline: 'Ongoing',
    amount: 'Free Service',
    category: 'Agricultural Support'
  },
  {
    id: '4',
    name: 'Micro Irrigation Fund',
    ministry: 'NABARD',
    benefit: 'Subsidy on drip and sprinkler irrigation systems',
    eligibility: [
      'Small and marginal farmers prioritized',
      'Land suitable for micro irrigation',
      'Valid land ownership documents'
    ],
    documents: ['Land Records', 'Quotation from empaneled vendor', 'Bank Account'],
    deadline: '31st March 2025',
    amount: '55-60% subsidy',
    category: 'Irrigation'
  }
];

const categories = ['All', 'Income Support', 'Insurance', 'Irrigation', 'Agricultural Support'];

export function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isListening, setIsListening] = useState(false);

  const filteredSchemes = mockSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.benefit.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            Government <span className="hologram-text">Schemes</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Navigate agricultural subsidies and government programs with voice assistance. 
          Find schemes you're eligible for.
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <GlassCard variant="strong" hover={false}>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes (e.g., irrigation subsidy, PM-KISAN)"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <NeonButton 
              variant={isListening ? 'primary' : 'secondary'}
              onClick={() => setIsListening(!isListening)}
            >
              <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
              {isListening ? 'Listening...' : 'Ask'}
            </NeonButton>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground neon-border'
                    : 'glass hover:neon-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Schemes List */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold mb-4">
            {filteredSchemes.length} Schemes Available
          </h2>

          {filteredSchemes.map((scheme, i) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <GlassCard 
                className={`cursor-pointer ${selectedScheme?.id === scheme.id ? 'neon-border' : ''}`}
                onClick={() => setSelectedScheme(scheme)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <HologramBadge variant="info">{scheme.category}</HologramBadge>
                    </div>
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                      {scheme.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {scheme.benefit}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1 text-primary">
                        <IndianRupee className="w-4 h-4" />
                        <span>{scheme.amount}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{scheme.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Scheme Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {selectedScheme ? (
              <motion.div
                key={selectedScheme.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <GlassCard variant="neon" hover={false}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <HologramBadge variant="success" className="mb-2">
                        {selectedScheme.category}
                      </HologramBadge>
                      <h2 className="text-2xl font-bold">{selectedScheme.name}</h2>
                    </div>
                    <NeonButton variant="secondary" size="sm">
                      <Volume2 className="w-4 h-4" />
                      Listen
                    </NeonButton>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Building className="w-4 h-4" />
                    <span>{selectedScheme.ministry}</span>
                  </div>

                  <p className="text-lg mb-6">{selectedScheme.benefit}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-primary/10">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <IndianRupee className="w-4 h-4" />
                        Benefit Amount
                      </div>
                      <span className="text-xl font-bold text-primary">{selectedScheme.amount}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/10">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        Deadline
                      </div>
                      <span className="text-xl font-bold text-secondary">{selectedScheme.deadline}</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Eligibility */}
                <GlassCard hover={false}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Eligibility Criteria
                  </h3>
                  <ul className="space-y-3">
                    {selectedScheme.eligibility.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {/* Documents */}
                <GlassCard hover={false}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-secondary" />
                    Required Documents
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedScheme.documents.map((doc) => (
                      <span
                        key={doc}
                        className="px-3 py-2 rounded-xl text-sm bg-muted/50"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                {/* Apply Button */}
                <NeonButton className="w-full" size="lg">
                  Apply Now
                  <ExternalLink className="w-5 h-5" />
                </NeonButton>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassCard hover={false} className="h-full min-h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 mx-auto mb-6 rounded-2xl glass flex items-center justify-center"
                    >
                      <FileText className="w-12 h-12 text-primary/50" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                      Select a Scheme
                    </h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      Click on any scheme to view detailed eligibility, 
                      documents required, and how to apply.
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
