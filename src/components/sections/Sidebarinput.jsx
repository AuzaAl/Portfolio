import { motion, AnimatePresence } from "framer-motion";

export default function Sidebarinput({ isOpen, setIsOpen, overlayVariants, sidebarVariants }) {
  return (
    <div id="sidebar-input" className="relative">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 w-100 h-full bg-white shadow-lg z-50 p-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: [0.445, 0.05, 0.55, 0.95],
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Sidebar</h2>
                <button onClick={() => setIsOpen(false)} className="text-xl">
                  &times;
                </button>
              </div>

              <div className="text-gray-600">
                <p>Sidebar content goes here.</p>              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
