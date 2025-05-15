"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ExternalLink } from 'lucide-react';

interface DashboardFooterProps {
  className?: string;
}

export function DashboardFooter({ className }: DashboardFooterProps) {
  return (
    <motion.footer 
      className={`w-full border-t border-gray-800 mt-8 py-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-indigo-400" />
          <span className="text-sm text-gray-400">
            Cyber Threat Intelligence Dashboard © {new Date().getFullYear()}
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <motion.a 
            href="#" 
            className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Documentation <ExternalLink className="h-3 w-3" />
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            API Reference <ExternalLink className="h-3 w-3" />
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AlienVault OTX <ExternalLink className="h-3 w-3" />
          </motion.a>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-gray-500">Data refreshed every 30 minutes</span>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="w-full flex justify-center mt-4">
        <motion.div 
          className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-50"
          initial={{ width: 0 }}
          animate={{ width: '4rem' }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>
    </motion.footer>
  );
}

export default DashboardFooter;
