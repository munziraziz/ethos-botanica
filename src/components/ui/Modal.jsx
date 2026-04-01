import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-900/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                       w-full max-w-md bg-white rounded-2xl shadow-xl border border-brand-100/30 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-outfit text-2xl font-bold gradient-text">{title}</h2>
              <button
                onClick={onClose}
                className="text-brand-200 hover:text-neon-green transition-colors p-1"
              >
                <IoClose size={24} />
              </button>
            </div>
            {children}

               
          </motion.div>

          
        </>
      )}
    </AnimatePresence>
  );
}
