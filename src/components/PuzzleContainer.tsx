import React from 'react';

interface PuzzleContainerProps {
  title: string;
  children: React.ReactNode;
  puzzleNumber: number;
}

const PuzzleContainer: React.FC<PuzzleContainerProps> = ({ title, children, puzzleNumber }) => {
  return (
    <div className="bg-yellow-50 p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-300 relative overflow-hidden">
      {/* Recipe card styling - a "clip" or "bookmark" element */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-12 bg-overbooked-red rounded-b-lg shadow-md flex items-center justify-center">
        <span className="text-white font-bold text-sm">Puzzle {puzzleNumber}</span>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-overbooked-orange mb-4 mt-8 text-center">{title}</h2>
      
      {/* Wooden background effect - could be an actual image later */}
      <div className="bg-orange-100 p-3 sm:p-5 rounded-xl shadow-inner border-2 border-orange-200">
        {children}
      </div>

      {/* Placeholder for some kitchen-themed decorative elements */}
      <div className="absolute bottom-2 right-2 text-4xl opacity-30">🍳</div>
      <div className="absolute top-2 left-2 text-4xl opacity-30 transform rotate-[-15deg]">🥕</div>
    </div>
  );
};

export default PuzzleContainer;
