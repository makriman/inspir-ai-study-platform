import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Zap, Shield, Target, Globe } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  // 15 revolutionary study tools
  const tools = [
    { id: 'draw', icon: '🎨', label: 'Draw/Sketch', gradient: 'from-blue-500 to-green-500' },
    { id: 'quiz', icon: '📝', label: 'Quiz Generator', gradient: 'from-purple-500 to-pink-500' },
    { id: 'flashcards', icon: '🃏', label: 'Flashcards', gradient: 'from-yellow-500 to-orange-500' },
    { id: 'practice', icon: '📊', label: 'Practice Tests', gradient: 'from-blue-500 to-indigo-500' },
    { id: 'timer', icon: '⏰', label: 'Study Timer', gradient: 'from-red-500 to-pink-500' },
    { id: 'habits', icon: '✅', label: 'Habit Tracker', gradient: 'from-green-500 to-teal-500' },
    { id: 'explain', icon: '💡', label: 'Explain Concept', gradient: 'from-yellow-400 to-yellow-600' },
    { id: 'music', icon: '🎵', label: 'Study Music', gradient: 'from-purple-400 to-purple-600' },
    { id: 'image', icon: '📸', label: 'Image Analysis', gradient: 'from-blue-400 to-cyan-500' },
    { id: 'math', icon: '🧮', label: 'Math Solver', gradient: 'from-indigo-500 to-blue-500' },
    { id: 'science', icon: '🔬', label: 'Science Lab', gradient: 'from-green-400 to-emerald-500' },
    { id: 'visual', icon: '🌍', label: 'Visual Learning', gradient: 'from-blue-500 to-green-400' },
    { id: 'notes', icon: '📓', label: 'Notes Sync', gradient: 'from-amber-600 to-orange-600' },
    { id: 'planner', icon: '📅', label: 'AI Planner', gradient: 'from-violet-500 to-purple-500' },
    { id: 'goals', icon: '🎯', label: 'Goal Setter', gradient: 'from-red-500 to-rose-500' }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Learning',
      description: 'Powered by Claude Sonnet 4.5, the most advanced AI tutor',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: '15 Study Tools',
      description: 'Everything you need: quizzes, flashcards, timers, planners & more',
      gradient: 'from-pink-600 to-purple-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Age-Appropriate',
      description: 'Safe content filtering for students of all ages',
      gradient: 'from-green-600 to-teal-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-Time Streaming',
      description: 'Lightning-fast responses with live streaming AI',
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Goal Tracking',
      description: 'Track study streaks, time, and progress toward your goals',
      gradient: 'from-red-600 to-pink-600'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'All Subjects',
      description: 'Math, Science, English, History, and more - we cover it all',
      gradient: 'from-blue-600 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              duration: 1
            }}
            className="mb-8"
          >
            <motion.div
              className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center shadow-2xl"
              animate={{
                boxShadow: [
                  '0 20px 60px rgba(124, 58, 237, 0.4)',
                  '0 20px 80px rgba(59, 130, 246, 0.6)',
                  '0 20px 60px rgba(124, 58, 237, 0.4)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.span
                className="text-6xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Hero Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
          >
            inspir
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4"
          >
            Revolutionary AI Study Companion
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            The most advanced AI tutor powered by Claude Sonnet 4.5. Learn smarter, not harder with 15 revolutionary study tools.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/chat')}
            className="px-12 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all"
          >
            Get Started - It's Free!
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-4 text-sm text-gray-500"
          >
            No sign-up required. Start learning immediately.
          </motion.p>
        </div>
      </section>

      {/* 15 Tools Showcase */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              15 Revolutionary Study Tools
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to excel in your studies, all in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className={`w-full aspect-square rounded-3xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all`}>
                  <span className="text-5xl md:text-6xl">{tool.icon}</span>
                </div>
                <p className="mt-3 text-center text-sm font-semibold text-gray-700">
                  {tool.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Students Love inspir
            </h2>
            <p className="text-xl text-gray-600">
              Built different. Designed for excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-white mb-6"
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-10"
          >
            Join thousands of students already using inspir to ace their exams
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/chat')}
            className="px-12 py-5 bg-white text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-white/30 transition-all border-2 border-white"
          >
            Start Learning Now →
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 inspir. Powered by Claude Sonnet 4.5. Built for students, by innovators.
          </p>
        </div>
      </footer>
    </div>
  );
}
