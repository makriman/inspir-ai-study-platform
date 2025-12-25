import { motion } from 'framer-motion';

export default function ToolbarIcon({ tool, index, isActive, onClick }) {
  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: index * 0.03,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      whileHover={{
        scale: 1.3,
        rotate: [-5, 5, -5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group tool-icon"
    >
      {/* Icon Container */}
      <motion.div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-3xl shadow-lg transition-all ${
          isActive ? 'ring-4 ring-blue-400 ring-offset-2' : ''
        }`}
        animate={isActive ? {
          boxShadow: [
            '0 4px 12px rgba(59, 130, 246, 0.3)',
            '0 4px 20px rgba(59, 130, 246, 0.5)',
            '0 4px 12px rgba(59, 130, 246, 0.3)',
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {tool.icon}
      </motion.div>

      {/* Active Indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
      >
        <div className="font-semibold">{tool.label}</div>
        <div className="text-gray-300 text-[10px]">{tool.description}</div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </motion.div>
    </motion.button>
  );
}
