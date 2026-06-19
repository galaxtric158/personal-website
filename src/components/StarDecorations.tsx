import { Sparkles } from 'lucide-react';

export function StarDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-8 opacity-40">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-bubble-300" />
      <Sparkles size={14} className="text-bubble-400 animate-pulse-soft" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-bubble-300" />
    </div>
  );
}

export function FloatingStar({ className = '', size = 12, delay = 0 }: { className?: string; size?: number; delay?: number }) {
  return (
    <Sparkles
      size={size}
      className={`text-bubble-400/50 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

export function StarCluster({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <FloatingStar size={10} delay={0} className="absolute top-0 left-0" />
      <FloatingStar size={8} delay={0.5} className="absolute top-3 left-4" />
      <FloatingStar size={6} delay={1} className="absolute top-1 left-7" />
    </div>
  );
}
