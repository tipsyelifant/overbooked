import React from 'react';

interface ProgressTrackerProps {
  currentPuzzle: number;
  totalPuzzles: number;
  processesCount: number;
  currentTime: number; // in minutes
}

// Placeholder icons (chef hat, clock) - ideally SVG or image components
const ChefHatIcon = () => <span role="img" aria-label="processes">👨‍🍳</span>;
const ClockIcon = () => <span role="img" aria-label="time">⏰</span>;
const PuzzleIcon = () => <span role="img" aria-label="puzzle piece">🧩</span>;


const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentPuzzle,
  totalPuzzles,
  processesCount,
  currentTime,
}) => {
  const progressPercentage = (currentPuzzle / totalPuzzles) * 100;

  return (
    <div className="p-3 bg-overbooked-yellow rounded-xl shadow-md border-4 border-orange-300">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
        
        <div className="flex items-center space-x-2 text-overbooked-orange">
          <PuzzleIcon />
          <span className="font-semibold text-sm sm:text-base">Puzzle: {currentPuzzle}/{totalPuzzles}</span>
        </div>

        <div className="w-full sm:w-1/2 bg-gray-200 rounded-full h-6 border-2 border-gray-300 overflow-hidden">
          <div
            className="bg-overbooked-green h-full rounded-full transition-all duration-500 ease-out text-xs flex items-center justify-center text-white font-bold"
            style={{ width: `${progressPercentage}%` }}
          >
            {Math.round(progressPercentage)}%
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-overbooked-red">
          <ChefHatIcon />
          <span className="font-semibold text-sm sm:text-base">Processes: {processesCount}</span>
        </div>

        <div className="flex items-center space-x-2 text-blue-600">
          <ClockIcon />
          <span className="font-semibold text-sm sm:text-base">Time: {currentTime}min</span>
        </div>

      </div>
    </div>
  );
};

export default ProgressTracker;
