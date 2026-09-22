import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-slate-950 flex flex-col z-10 shadow-2xl border-r border-slate-200 dark:border-slate-800"
          >
            {/* Close Button top-right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 min-w-[44px] min-h-[44px] p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors z-20 cursor-pointer flex items-center justify-center"
              aria-label="Close menu drawer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sidebar content */}
            <div className="flex-1 overflow-hidden pt-2">
              <Sidebar
                isCollapsed={false}
                onToggleCollapse={() => {}}
                onNavigateMobile={onClose}
                className="w-full border-r-0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
