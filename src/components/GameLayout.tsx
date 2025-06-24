import React from 'react';

interface GameLayoutProps {
  children: React.ReactNode;
  // Will add props for ProgressTracker and NavigationControls later
}

const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-overbooked-yellow font-overbooked">
      <header className="bg-overbooked-orange text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Overbooked Kitchen</h1>
        {/* ProgressTracker will go here */}
      </header>
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        {children}
      </main>
      
      <footer className="bg-overbooked-red text-white p-3 text-center shadow-up-lg">
        {/* NavigationControls will go here */}
        <p className="text-sm">&copy; 2024 Dangugu Restaurant - Lean Learning</p>
      </footer>
    </div>
  );
};

export default GameLayout;
