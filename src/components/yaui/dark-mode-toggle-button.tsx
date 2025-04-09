"use client";

import React from "react";
import { motion } from "framer-motion";

interface DarkModeToggleButtonProps {
  darkIcon: React.ReactNode;
  lightIcon: React.ReactNode;
  onClick: () => void;
  theme: string | undefined;
}

const DarkModeToggleButton: React.FC<DarkModeToggleButtonProps> = ({
  darkIcon,
  lightIcon,
  onClick,
  theme,
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.7 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={{ scale: 1, opacity: 0.1 }}
        animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? darkIcon : lightIcon}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggleButton;
