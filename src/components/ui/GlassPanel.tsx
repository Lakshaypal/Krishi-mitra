import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "dark" | "bordered";
}

export default function GlassPanel({
    children,
    className,
    variant = "default",
    ...props
}: GlassPanelProps) {
    return (
        <motion.div
            className={cn(
                "glass-panel rounded-2xl p-6 relative overflow-hidden",
                {
                    "bg-cyber-glass/50": variant === "default",
                    "bg-black/60": variant === "dark",
                    "border-cyber-green/20": variant === "bordered",
                },
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}

            // We need to cast the transition to any because of a known type issue with framer-motion props in some setups
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transition={{ duration: 0.5, ease: "outCirc" } as any}

            {...props}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent opacity-50" />
            {children}
        </motion.div>
    );
}
