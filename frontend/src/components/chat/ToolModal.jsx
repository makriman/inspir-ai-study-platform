import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ToolModal({ tool, onClose }) {
  const [quizSettings, setQuizSettings] = useState({
    topic: '',
    difficulty: 'medium',
    questions: 5
  });

  const [timerSettings, setTimerSettings] = useState({
    duration: 25,
    isRunning: false,
    timeLeft: 25 * 60
  });

  const renderToolContent = () => {
    switch (tool.id) {
      case 'quiz':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Topic
              </label>
              <input
                type="text"
                value={quizSettings.topic}
                onChange={(e) => setQuizSettings({ ...quizSettings, topic: e.target.value })}
                placeholder="e.g., World War II, Algebra, Cell Biology"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['easy', 'medium', 'hard'].map(level => (
                  <button
                    key={level}
                    onClick={() => setQuizSettings({ ...quizSettings, difficulty: level })}
                    className={`px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                      quizSettings.difficulty === level
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions: {quizSettings.questions}
              </label>
              <input
                type="range"
                min="3"
                max="20"
                value={quizSettings.questions}
                onChange={(e) => setQuizSettings({ ...quizSettings, questions: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
              Generate Quiz 🚀
            </button>
          </div>
        );

      case 'timer':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-4">
                {Math.floor(timerSettings.timeLeft / 60)}:{(timerSettings.timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <p className="text-gray-600">Pomodoro Timer</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[15, 25, 45].map(mins => (
                <button
                  key={mins}
                  onClick={() => setTimerSettings({ ...timerSettings, duration: mins, timeLeft: mins * 60 })}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    timerSettings.duration === mins
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all">
                {timerSettings.isRunning ? 'Pause ⏸️' : 'Start ▶️'}
              </button>
              <button className="flex-1 px-6 py-4 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all">
                Reset 🔄
              </button>
            </div>
          </div>
        );

      case 'flashcards':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 min-h-[300px] flex items-center justify-center border-2 border-yellow-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  What is the capital of France?
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Click to reveal answer
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">
                ← Previous
              </button>
              <span className="text-sm text-gray-600 font-medium">Card 1 of 10</span>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                Next →
              </button>
            </div>

            <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all">
              + Create New Flashcard Set
            </button>
          </div>
        );

      case 'draw':
        return (
          <div className="space-y-4">
            <div className="bg-white border-2 border-gray-300 rounded-xl h-96 cursor-crosshair">
              <div className="flex items-center justify-center h-full text-gray-400">
                Click and drag to draw
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'].map(color => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input type="range" min="1" max="20" defaultValue="5" className="flex-1" />
              <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                Clear
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Lo-fi Beats', emoji: '🎵', color: 'from-purple-500 to-pink-500' },
                { name: 'Classical Focus', emoji: '🎼', color: 'from-blue-500 to-cyan-500' },
                { name: 'Nature Sounds', emoji: '🌊', color: 'from-green-500 to-teal-500' },
                { name: 'Binaural Beats', emoji: '🎧', color: 'from-orange-500 to-red-500' }
              ].map(playlist => (
                <button
                  key={playlist.name}
                  className={`p-6 bg-gradient-to-br ${playlist.color} rounded-2xl text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="text-4xl mb-2">{playlist.emoji}</div>
                  <div className="font-semibold">{playlist.name}</div>
                </button>
              ))}
            </div>

            <div className="bg-gray-900 text-white rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
                <div>
                  <p className="font-semibold">Now Playing</p>
                  <p className="text-sm text-gray-400">Lo-fi Study Mix</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-2xl">⏮️</button>
                <button className="text-4xl">▶️</button>
                <button className="text-2xl">⏭️</button>
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{tool.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{tool.label}</h3>
            <p className="text-gray-600 mb-6">{tool.description}</p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg">
              Coming Soon! 🚀
            </button>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${tool.gradient} px-8 py-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{tool.icon}</div>
              <div>
                <h2 className="text-2xl font-bold">{tool.label}</h2>
                <p className="text-white/80 text-sm">{tool.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          {renderToolContent()}
        </div>
      </motion.div>
    </motion.div>
  );
}
