import React from 'react'
import { FiChevronDown, FiX, FiSend, FiEdit2, FiTrash2 } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import ColoredButton from '../common/Coloredbutton';

export const Inputsidebar = ({ isOpen, setIsOpen, handlesubmit, overlayVariants, sidebarVariants, children, Htext, Mode }) => {
  return (
    <div id="sidebar-input" className="relative">
      {/* Sidebar + Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              id="overlay-gelap"
              className="fixed inset-0 bg-black z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              id="sidebar-input-wrapper"
              className="fixed top-0 right-0 w-130 h-full bg-phantom-900 shadow-lg z-50"
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
              <div className="flex items-center border-b-1 border-t-1 border-l-1 border-phantom-600 w-full h-15 px-4 py-2 font-lex">
                <h2 className="text-lg font-medium text-white">
                  {Mode === 'edit' ? 'Edit the' : 'Add new'}{" "}
                  <span className="font-light bg-phantom-800 px-2 rounded-md border-1 border-phantom-600">
                    {Htext}
                  </span>
                </h2>
              </div>
              <div
                id="form-title"
                className="w-full p-4 text-white border-l-1 border-phantom-600"
              >
                <h1 className="font-lex font-semibold">{Mode === 'edit' ? 'Edit the' : 'Add new'} element</h1>
                <p className="text-phantom-500 text-[14px] -mt-1">
                  Fill in the form and click "Submit"
                </p>
              </div>
              <div className="w-full h-[calc(100%-8.4rem)] flex flex-col justify-between overflow-y-auto border-l border-phantom-600">
                <form
                  id="form"
                  onSubmit={handlesubmit}
                  className="w-full p-4 border-phantom-600"
                >
                  <div
                    id="form-data-wrapper"
                    className="w-full flex flex-col space-y-15"
                  >
                    {children}
                  </div>
                </form>

                <div
                  id="action-button"
                  className="w-full border-t-1 border-phantom-600 p-2 flex flex-row justify-end gap-4"
                >
                  <ColoredButton
                    Icon={FiX}
                    variant="default"
                    text="CANCEL"
                    onClick={() => setIsOpen(false)}
                  />
                  <ColoredButton
                    Icon={FiSend}
                    variant="success"
                    text="SUBMIT"
                    type="submit"
                    form="form"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
