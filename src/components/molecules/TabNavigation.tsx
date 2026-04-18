import { cn } from '../atoms/Input';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function TabNavigation({ tabs, activeTab, onTabChange, className }: TabNavigationProps) {
  return (
    <div className={cn("flex items-center space-x-1 rounded-md bg-neutral-100 p-1 w-fit", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-1.5 text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
              isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-white rounded shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
