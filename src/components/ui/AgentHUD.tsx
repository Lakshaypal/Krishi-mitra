import { motion } from 'framer-motion';
import { Activity, Brain, Globe, Leaf, MessageSquare, ShoppingCart, TrendingUp } from 'lucide-react';
import GlassPanel from './GlassPanel';

const agents = [
    { id: 'triage', name: 'Triage Agent', icon: Brain, color: 'text-cyber-green' },
    { id: 'vision', name: 'Vision Agent', icon: Leaf, color: 'text-emerald-400' },
    { id: 'sourcing', name: 'Sourcing Agent', icon: MapPinIcon, color: 'text-cyan-400' },
    { id: 'market', name: 'Market Agent', icon: TrendingUp, color: 'text-purple-400' },
    { id: 'strategy', name: 'Strategy Agent', icon: Globe, color: 'text-orange-400' },
    { id: 'communication', name: 'Comm Agent', icon: MessageSquare, color: 'text-pink-400' },
];

function MapPinIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

interface AgentHUDProps {
    activeAgent?: string;
}

export default function AgentHUD({ activeAgent = 'triage' }: AgentHUDProps) {
    return (
        <div className="fixed bottom-8 right-8 z-50">
            <GlassPanel className="p-4 w-64">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">System Status</h3>
                    <Activity className="w-4 h-4 text-cyber-green animate-pulse" />
                </div>

                <div className="space-y-3">
                    {agents.map((agent) => {
                        const isActive = activeAgent === agent.id;
                        return (
                            <div
                                key={agent.id}
                                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-white/5 border border-cyber-green/30 shadow-[0_0_10px_rgba(0,255,157,0.1)]' : 'opacity-40'
                                    }`}
                            >
                                <agent.icon className={`w-4 h-4 ${agent.color}`} />
                                <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-muted-foreground'}`}>
                                    {agent.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-dot"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </GlassPanel>
        </div>
    );
}
