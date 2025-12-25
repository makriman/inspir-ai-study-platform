import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function RightSidebar({
  collapsed,
  onToggle,
  conversations,
  currentConversation,
  onSelectConversation,
  onDeleteConversation,
  onNewConversation,
  studyStreak,
  todayStudyTime
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chats'); // 'chats', 'notes', 'planner', 'saved'
  const [savedMessages, setSavedMessages] = useState([]);
  const [notes, setNotes] = useState([]);

  // Load saved messages and notes from localStorage
  useState(() => {
    const loadData = () => {
      const saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
      const notesList = JSON.parse(localStorage.getItem('notes') || '[]');
      setSavedMessages(saved);
      setNotes(notesList);
    };
    loadData();
    // Refresh every second to catch updates
    const interval = setInterval(loadData, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      className={`bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 border-l border-gray-200 flex flex-col relative ${
        collapsed ? 'w-16' : 'w-80'
      }`}
      initial={false}
      animate={{ width: collapsed ? 64 : 320 }}
      transition={{ duration: 0.3 }}
    >
      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -left-3 top-4 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 z-10"
      >
        {collapsed ? (
          <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
        )}
      </button>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden h-full"
          >
            {/* Header */}
            <div className="px-4 border-b border-gray-200 bg-white h-20 flex items-center">
              <button
                onClick={onNewConversation}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-green-700 transition-all font-semibold shadow-md hover:shadow-lg text-sm"
              >
                + New Chat
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-white">
              {[
                { id: 'chats', label: '💬 Chats' },
                { id: 'notes', label: '📓 Notes' },
                { id: 'planner', label: '📅 Planner' },
                { id: 'saved', label: '⭐ Saved' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'chats' && (
                <div className="p-4">
                  {/* Search */}
                  <div className="relative mb-4">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Conversations List */}
                  <div className="space-y-2">
                    {filteredConversations.length === 0 ? (
                      <p className="text-center text-gray-500 text-sm py-8">
                        No conversations yet
                      </p>
                    ) : (
                      filteredConversations.map(conv => (
                        <motion.div
                          key={conv.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => onSelectConversation(conv)}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            currentConversation?.id === conv.id
                              ? 'bg-blue-100 border border-blue-300 shadow-sm'
                              : 'bg-white hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                currentConversation?.id === conv.id
                                  ? 'text-blue-700'
                                  : 'text-gray-900'
                              }`}>
                                {conv.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(conv.updated_at)}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteConversation(conv.id);
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                            >
                              🗑️
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="p-4">
                  {notes.length === 0 ? (
                    <div className="text-center py-12">
                      <span className="text-5xl mb-4 block">📓</span>
                      <p className="text-sm text-gray-500">No notes yet</p>
                      <p className="text-xs text-gray-400 mt-2">Click 📝 on messages to add them</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notes.map((note, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border border-blue-200 shadow-sm">
                          <p className="text-sm text-gray-700 line-clamp-3">{note.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {new Date(note.timestamp).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => {
                                const updated = notes.filter((_, i) => i !== idx);
                                localStorage.setItem('notes', JSON.stringify(updated));
                                setNotes(updated);
                              }}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'planner' && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                        <span>📅</span>
                        Today's Plan
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-gray-700">Study Math - 30 min</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-gray-400">○</span>
                          <span className="text-gray-700">Read History - 45 min</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-gray-400">○</span>
                          <span className="text-gray-700">Practice Quiz - 20 min</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="p-4">
                  {savedMessages.length === 0 ? (
                    <div className="text-center py-12">
                      <span className="text-5xl mb-4 block">⭐</span>
                      <p className="text-sm text-gray-500">No saved items yet</p>
                      <p className="text-xs text-gray-400 mt-2">Click ⭐ on messages to save them</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedMessages.map((msg, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border border-yellow-200 shadow-sm">
                          <p className="text-sm text-gray-700 line-clamp-3">{msg.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {new Date(msg.timestamp).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => {
                                const updated = savedMessages.filter((_, i) => i !== idx);
                                localStorage.setItem('savedMessages', JSON.stringify(updated));
                                setSavedMessages(updated);
                              }}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Stats */}
            <div className="p-4 border-t border-gray-200 bg-gradient-to-br from-purple-100 to-blue-100">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-medium">Study Streak</span>
                  <span className="text-sm font-bold text-orange-600">🔥 {studyStreak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-medium">Today's Time</span>
                  <span className="text-sm font-bold text-blue-600">
                    ⏱️ {Math.floor(todayStudyTime / 60)}h {todayStudyTime % 60}m
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed State */}
      {collapsed && (
        <div className="flex flex-col items-center py-4 gap-4 bg-white h-full">
          <button
            onClick={onNewConversation}
            className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg"
            title="New Chat"
          >
            +
          </button>
          <div className="text-2xl cursor-pointer hover:scale-110 transition-transform">💬</div>
          <div className="text-2xl cursor-pointer hover:scale-110 transition-transform">📓</div>
          <div className="text-2xl cursor-pointer hover:scale-110 transition-transform">📅</div>
          <div className="text-2xl cursor-pointer hover:scale-110 transition-transform">⭐</div>
        </div>
      )}
    </motion.div>
  );
}
