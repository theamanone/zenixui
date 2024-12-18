'use client';

import { useState } from 'react';
import { Octokit } from 'octokit';
import AchievementCard from './components/AchievementCard';

type Achievement = {
  name: string;
  description: string;
  progress: number;
  total: number;
  category: 'repositories' | 'social' | 'coding' | 'special';
  icon: string;
};

const achievements: Achievement[] = [
  {
    name: 'Pull Shark',
    description: 'Opened pull requests that have been merged',
    progress: 2,
    total: 16,
    category: 'coding',
    icon: '🦈'
  },
  {
    name: 'YOLO',
    description: 'Merged your own pull request',
    progress: 1,
    total: 1,
    category: 'special',
    icon: '🎯'
  },
  {
    name: 'Quickdraw',
    description: 'Commented on an issue within 5 minutes of creation',
    progress: 2,
    total: 3,
    category: 'social',
    icon: '⚡'
  },
  {
    name: 'Galaxy Brain',
    description: 'Answered discussions with accepted answers',
    progress: 3,
    total: 8,
    category: 'social',
    icon: '🧠'
  },
  {
    name: 'Starstruck',
    description: 'Created a repository that has many stars',
    progress: 12,
    total: 16,
    category: 'repositories',
    icon: '⭐'
  },
  {
    name: 'Pair Extraordinaire',
    description: 'Coauthored commits on merged pull request',
    progress: 1,
    total: 3,
    category: 'coding',
    icon: '👥'
  }
];

export default function Home() {
  const [username, setUsername] = useState('theamanone');
  const [loading, setLoading] = useState(false);

  const refreshAchievements = async () => {
    setLoading(true);
    try {
      // TODO: Implement GitHub API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            GitHub Achievement Hunter
          </h1>
          <p className="text-xl text-gray-300">
            Track and unlock GitHub achievements to level up your profile!
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field w-64"
            placeholder="GitHub Username"
          />
          <button
            onClick={refreshAchievements}
            disabled={loading}
            className="button-primary"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {achievements.map((achievement) => (
            <div key={achievement.name} className="achievement-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{achievement.name}</h3>
                  <p className="text-gray-400">{achievement.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">
                    {achievement.progress} / {achievement.total}
                  </span>
                  <span className="text-gray-300">
                    {((achievement.progress / achievement.total) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="achievement-progress">
                  <div
                    className="achievement-progress-bar bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{
                      width: `${(achievement.progress / achievement.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="achievement-card">
          <h2 className="text-2xl font-bold mb-6">Achievement Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">●</span>
                <p className="text-gray-300">
                  Create and merge pull requests to earn the Pull Shark achievement
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">●</span>
                <p className="text-gray-300">
                  Quickly respond to new issues to unlock Quickdraw
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">●</span>
                <p className="text-gray-300">
                  Help others by answering questions to earn Galaxy Brain
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">●</span>
                <p className="text-gray-300">
                  Collaborate with others to earn Pair Extraordinaire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
