import { Octokit } from 'octokit';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          GitHub Profile Enhancer
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Achievement Progress */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Achievement Progress</h2>
            <div className="space-y-4">
              <div className="achievement-item">
                <div className="flex justify-between mb-2">
                  <span>Quickdraw</span>
                  <span>2/3</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 rounded-full h-2 w-2/3"></div>
                </div>
              </div>
              
              <div className="achievement-item">
                <div className="flex justify-between mb-2">
                  <span>Pull Shark</span>
                  <span>4/16</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 rounded-full h-2 w-1/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-green-400">●</span>
                <span>Create a pull request to earn the Pull Shark achievement</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-yellow-400">●</span>
                <span>Comment on an issue within 5 minutes of creation for Quickdraw</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-400">●</span>
                <span>Start a discussion to earn the Community Catalyst badge</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
