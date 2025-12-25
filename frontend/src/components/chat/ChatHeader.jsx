import { motion } from 'framer-motion';

const subjects = [
  'General', 'Math', 'Physics', 'Chemistry', 'Biology',
  'English', 'History', 'Geography', 'Computer Science', 'Economics'
];

const ageFilters = [
  { value: 'under14', label: 'Under 14', emoji: '🛡️', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'teen', label: 'Teen (13-17)', emoji: '🎓', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { value: 'adult', label: 'Adult (18+)', emoji: '🎯', color: 'bg-purple-100 text-purple-700 border-purple-300' }
];

export default function ChatHeader({
  currentSubject,
  ageFilter,
  studyStreak,
  todayStudyTime,
  onSubjectChange,
  onAgeFilterChange
}) {
  const formatStudyTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-8 shadow-sm h-20 flex items-center"
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo & Subject */}
        <div className="flex items-center gap-6">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                inspir
              </h1>
              <p className="text-xs text-gray-500">AI Study Companion</p>
            </div>
          </motion.div>

          {/* Subject Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Subject:</span>
            <select
              value={currentSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Stats & Age Filter */}
        <div className="flex items-center gap-4">
          {/* Study Streak */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-xs text-gray-600">Streak</p>
              <p className="text-sm font-bold text-orange-600">{studyStreak} days</p>
            </div>
          </motion.div>

          {/* Today's Study Time */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="text-xs text-gray-600">Today</p>
              <p className="text-sm font-bold text-blue-600">{formatStudyTime(todayStudyTime)}</p>
            </div>
          </motion.div>

          {/* Age Filter */}
          <div className="relative">
            <select
              value={ageFilter}
              onChange={(e) => onAgeFilterChange(e.target.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 border ${
                ageFilters.find(f => f.value === ageFilter)?.color
              }`}
            >
              {ageFilters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.emoji} {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
