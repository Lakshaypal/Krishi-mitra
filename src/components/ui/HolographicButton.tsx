import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface HolographicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
}

export default function HolographicButton({
    children,
    className,
    variant = "primary",
    ...props
}: HolographicButtonProps) {
    return (
        <button
            className={cn(
                "relative px-6 py-3 rounded-lg font-ui font-medium tracking-wide transition-all duration-300 group overflow-hidden",
                "border backdrop-blur-md",
                {
                    "border-cyber-green/50 text-cyber-green hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]": variant === "primary",
                    "border-cyber-yellow/50 text-cyber-yellow hover:shadow-[0_0_20px_rgba(255,184,0,0.4)]": variant === "secondary",
                    "border-red-500/50 text-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]": variant === "danger",
                },
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}
