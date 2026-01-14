import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Scan, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Mic, 
  Leaf,
  ArrowRight,
  Sparkles,
  Globe,
  Shield
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { FloatingIcon } from '@/components/ui/FloatingIcon';
import { HologramBadge } from '@/components/ui/HologramBadge';

const features = [
  {
    path: '/diagnosis',
    icon: Scan,
    title: 'Crop Diagnosis',
    description: 'AI-powered disease detection from leaf photos with instant remedies',
    gradient: 'from-emerald-500 to-green-600',
    delay: 0.1,
  },
  {
    path: '/sourcing',
    icon: MapPin,
    title: 'Local Sourcing',
    description: 'Find nearest stores for fertilizers, pesticides & agricultural supplies',
    gradient: 'from-cyan-500 to-teal-600',
    delay: 0.2,
  },
  {
    path: '/market',
    icon: TrendingUp,
    title: 'Market Intelligence',
    description: 'Real-time mandi prices with AI-driven sell/wait recommendations',
    gradient: 'from-purple-500 to-violet-600',
    delay: 0.3,
  },
  {
    path: '/strategy',
    icon: Calendar,
    title: 'Crop Planning',
    description: 'Personalized farming strategies based on your land and resources',
    gradient: 'from-orange-500 to-amber-600',
    delay: 0.4,
  },
  {
    path: '/schemes',
    icon: FileText,
    title: 'Government Schemes',
    description: 'Navigate subsidies and agricultural programs with voice assistance',
    gradient: 'from-pink-500 to-rose-600',
    delay: 0.5,
  },
];

const stats = [
  { value: '50+', label: 'Languages', icon: Globe },
  { value: '100+', label: 'Crop Types', icon: Leaf },
  { value: '24/7', label: 'Available', icon: Shield },
];

export function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <HologramBadge variant="success">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Farming Assistant
                </HologramBadge>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="hologram-text">Krishi</span>
                  <br />
                  <span className="text-foreground">Mitra</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-lg">
                  Your intelligent farming companion. Voice-first, multilingual, 
                  designed for the next billion farmers.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/diagnosis">
                  <NeonButton size="lg">
                    <Scan className="w-5 h-5" />
                    Start Diagnosis
                    <ArrowRight className="w-5 h-5" />
                  </NeonButton>
                </Link>
                <NeonButton variant="secondary" size="lg">
                  <Mic className="w-5 h-5" />
                  Voice Command
                </NeonButton>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold neon-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Floating Icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[500px] hidden lg:block"
            >
              {/* Central Logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-40 h-40 rounded-full border-2 border-primary/30 border-dashed"
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow"
                >
                  <Leaf className="w-12 h-12 text-primary-foreground" />
                </motion.div>
              </div>

              {/* Floating Feature Icons */}
              <FloatingIcon className="absolute top-0 left-1/4" delay={0.1}>
                <Scan className="w-8 h-8 text-emerald-400" />
              </FloatingIcon>
              <FloatingIcon className="absolute top-1/4 right-0" delay={0.2}>
                <MapPin className="w-8 h-8 text-cyan-400" />
              </FloatingIcon>
              <FloatingIcon className="absolute bottom-1/4 right-1/4" delay={0.3}>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </FloatingIcon>
              <FloatingIcon className="absolute bottom-0 left-1/3" delay={0.4}>
                <Calendar className="w-8 h-8 text-orange-400" />
              </FloatingIcon>
              <FloatingIcon className="absolute top-1/3 left-0" delay={0.5}>
                <FileText className="w-8 h-8 text-pink-400" />
              </FloatingIcon>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="hologram-text">Intelligent Agents</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Six specialized AI agents working together to empower your farming decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link key={feature.path} to={feature.path}>
                <GlassCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay }}
                  className="h-full group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Voice First Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <GlassCard variant="neon" hover={false} className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              >
                <Mic className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Voice-First, <span className="hologram-text">Multilingual</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Speak in your language — Hindi, Tamil, Telugu, Kannada, and 50+ more. 
                Get instant audio responses you can understand.
              </p>
              <NeonButton size="lg">
                <Mic className="w-5 h-5" />
                Try Voice Command
              </NeonButton>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
