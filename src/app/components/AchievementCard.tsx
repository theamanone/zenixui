import React from 'react';

interface Achievement {
  name: string;
  description: string;
  progress: number;
  total: number;
  category: 'repositories' | 'social' | 'coding' | 'special';
  icon: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const progressPercentage = (achievement.progress / achievement.total) * 100;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'repositories':
        return 'from-green-500 to-emerald-700';
      case 'social':
        return 'from-blue-500 to-indigo-700';
      case 'coding':
        return 'from-purple-500 to-violet-700';
      case 'special':
        return 'from-yellow-500 to-amber-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getCategoryColor(achievement.category)} flex items-center justify-center`}>
          <span className="text-xl">{achievement.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{achievement.name}</h3>
          <p className="text-gray-400 text-sm">{achievement.description}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>{achievement.progress} / {achievement.total}</span>
          <span>{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`rounded-full h-2 bg-gradient-to-r ${getCategoryColor(achievement.category)}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
