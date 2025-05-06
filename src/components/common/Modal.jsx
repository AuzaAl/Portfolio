import { motion } from "framer-motion";
import React from "react";
import modalVariants from "../../../public/assets/animations/modalVariants";

export const Modal = ({
  isOpen,
  onClose,
  overlayVariants,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        id="overlay-gelap"
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />
      <motion.div
        className="fixed p-4 rounded-2xl shadow-lg max-w-md w-full left-1/2 top-1/2 transform -translate-x-1/2 border border-phantom-800 bg-gradient-to-br from-phantom-800 to-phantom-900 z-51"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()} // Supaya klik dalam modal tidak nutup modal
      >
        {children}
      </motion.div>
    </>
  );
};
