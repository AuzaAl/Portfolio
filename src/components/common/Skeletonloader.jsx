import React from 'react'
import { motion } from 'framer-motion'

export const Skeletonloader = () => {
  return (
    <div className="relative overflow-hidden bg-phantom-800 rounded-md h-full min-h-5 w-full">
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{
        repeat: Infinity,
        duration: 0.3,
        ease: "linear",
      }}
    />
  </div>
  )
}
