import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import GameLayout from '@/components/GameLayout';
import ProgressTracker from '@/components/ProgressTracker';
import NavigationControls from '@/components/NavigationControls';
import PuzzleContainer from '@/components/PuzzleContainer';
import DialogueBox from '@/components/DialogueBox';
import { useKitchenState } from '@/hooks/useKitchenState';
import { initialGameState } from '@/types/gameTypes'; // For resetting

const IntroductionContent: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2 text-overbooked-red">The Kitchen is a DISASTER!</h2>
    <p className="mb-4">
      Heidi, the new chef, just started at Dangugu Restaurant. It's famous for its delicious food, 
      but the kitchen is pure chaos! Processes are slow, everyone's stressed, and orders are getting mixed up. 
      Malik, the head chef, needs your help to apply Lean Methodology and turn things around.
    </p>
    <DialogueBox 
      character="Malik" 
      message="Welcome, new recruit! Ready to whip this kitchen into shape? Our first task is to see what we're dealing with. Let's do a Gemba Walk!" 
    />
  </div>
);

const PuzzleContent: React.FC<{ puzzleId: number }> = ({ puzzleId }) => {
  // Placeholder content for each puzzle
  let title = "";
  let description = "";
  switch (puzzleId) {
    case 1:
      title = "Puzzle 1: Gemba Walk";
      description = "Identify the 8 key kitchen processes from the chaotic kitchen photos. Click on the problems you spot!";
      break;
    case 2:
      title = "Puzzle 2: Value Stream Mapping";
      description = "Time the current processes using the security camera footage and find ways to combine steps to reduce from 8 to 7 processes.";
      break;
    case 3:
      title = "Puzzle 3: TIMWOOD-I Waste Hunt";
      description = "Analyze the kitchen for common wastes (Transportation, Inventory, Motion, Waiting, Over-production, Over-processing, Defects, Intellect) and eliminate one, reducing processes from 7 to 6.";
      break;
    case 4:
      title = "Puzzle 4: 5S Implementation";
      description = "Organize the kitchen into 4 efficient workstations using the 5S principles (Sort, Set in Order, Shine, Standardize, Sustain).";
      break;
    default:
      return <p>Unknown Puzzle</p>;
  }
  return (
    <div>
      <p>{description}</p>
      {/* Actual puzzle components will go here later */}
      <div className="my-4 p-4 border-2 border-dashed border-overbooked-red rounded-xl min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500">Interactive Puzzle Area for {title}</p>
      </div>
    </div>
  );
};

const ConclusionContent: React.FC<{ efficiency: number, time: number, satisfaction: number }> = ({ efficiency, time, satisfaction }) => (
  <div>
    <h2 className="text-xl font-semibold mb-2 text-overbooked-green">Restaurant is OVERBOOKED!</h2>
    <DialogueBox 
      character="Heidi" 
      message={`We did it! From ${initialGameState.kitchenEfficiency} processes taking ${initialGameState.serviceTime} minutes, we're now down to ${efficiency} processes and just ${time} minutes per order! Customer satisfaction is ${satisfaction}%!`} 
      emotion="happy"
    />
    <p className="mt-4">
      Thanks to your Lean expertise, Dangugu Restaurant is incredibly efficient and customers are happier than ever.
      It's so popular, it's constantly "Overbooked"!
    </p>
  </div>
);


function App() {
  const [loading, setLoading] = React.useState(true);
  const { gameState, setGameState, advancePuzzle, setDialogue } = useKitchenState();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Shorter loading for dev
    return () => clearTimeout(timer);
  }, []);
  
  // Sync URL with game state's currentPuzzle
  React.useEffect(() => {
    let targetPath = "/";
    if (gameState.currentPuzzle === 0) targetPath = "/";
    else if (gameState.currentPuzzle > 0 && gameState.currentPuzzle <= 4) targetPath = `/puzzle/${gameState.currentPuzzle}`;
    else if (gameState.currentPuzzle > 4) targetPath = "/conclusion";
    
    if (location.pathname !== targetPath) {
      navigate(targetPath, { replace: true });
    }
  }, [gameState.currentPuzzle, navigate, location.pathname]);


  const handleNext = () => {
    if (gameState.currentPuzzle < 5) { // 0:Intro, 1-4:Puzzles, 5:Conclusion
      advancePuzzle(); // This will change currentPuzzle and trigger useEffect above
      // Example dialogue update, this would be more context-specific
      if(gameState.currentPuzzle + 1 === 1) setDialogue("Heidi", "Okay, let's find those problems!");
    }
  };

  const handlePrevious = () => {
    if (gameState.currentPuzzle > 0) {
      const newPuzzle = gameState.currentPuzzle - 1;
      setGameState(prev => ({ ...prev, currentPuzzle: newPuzzle }));
      // Navigates via useEffect
    }
  };

  const handleReset = () => {
    setGameState(initialGameState); // Reset to initial state
    navigate("/", { replace: true }); // Navigate to introduction
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-overbooked-yellow">
        <h1 className="text-4xl font-overbooked text-overbooked-orange animate-bounce">
          Welcome to Overbooked!
        </h1>
      </div>
    );
  }

  const totalPuzzles = 4; // Number of actual puzzles
  const displayPuzzleNumber = gameState.currentPuzzle > 0 && gameState.currentPuzzle <= totalPuzzles ? gameState.currentPuzzle : 0;

  return (
    <GameLayout>
      <div className="mb-6">
        <ProgressTracker
          currentPuzzle={displayPuzzleNumber} // Show 0 if intro/conclusion
          totalPuzzles={totalPuzzles}
          processesCount={gameState.kitchenEfficiency}
          currentTime={gameState.serviceTime}
        />
      </div>

      {gameState.dialogueState && !loading && (
         <div className="my-4">
            <DialogueBox 
              character={gameState.dialogueState.character} 
              message={gameState.dialogueState.line}
            />
         </div>
      )}

      <Routes>
        <Route path="/" element={
          <PuzzleContainer title="Introduction" puzzleNumber={0}>
            <IntroductionContent />
          </PuzzleContainer>
        } />
        {[1, 2, 3, 4].map(id => (
          <Route 
            key={id} 
            path={`/puzzle/${id}`} 
            element={
              gameState.currentPuzzle === id ? (
                <PuzzleContainer title={`Puzzle ${id}: Activity`} puzzleNumber={id}>
                  <PuzzleContent puzzleId={id} />
                </PuzzleContainer>
              ) : (
                <Navigate to={gameState.currentPuzzle > 0 && gameState.currentPuzzle <=4 ? `/puzzle/${gameState.currentPuzzle}` : (gameState.currentPuzzle === 0 ? "/" : "/conclusion")} replace />
              )
            } 
          />
        ))}
        <Route path="/conclusion" element={
          gameState.currentPuzzle > totalPuzzles ? (
            <PuzzleContainer title="Game Over - You're Overbooked!" puzzleNumber={5}>
              <ConclusionContent 
                efficiency={gameState.kitchenEfficiency} 
                time={gameState.serviceTime}
                satisfaction={gameState.customerSatisfaction}
              />
            </PuzzleContainer>
          ) : (
             <Navigate to={gameState.currentPuzzle > 0 && gameState.currentPuzzle <=4 ? `/puzzle/${gameState.currentPuzzle}` : "/"} replace />
          )
        } />
         {/* Fallback for any other route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <div className="mt-8">
        <NavigationControls
          onNext={gameState.currentPuzzle < (totalPuzzles +1) ? handleNext : undefined} // Enable next until conclusion is reached
          onPrevious={gameState.currentPuzzle > 0 ? handlePrevious : undefined} // Enable previous if not on intro
          canProceed={true} // Logic for this can be added later
          canGoBack={gameState.currentPuzzle > 0}
          onHelp={() => alert("Help feature coming soon! Try to solve it yourself for now, chef!")}
        />
      </div>
       {/* Temporary Reset Button for Dev */}
       <div className="text-center mt-4">
          <button 
            onClick={handleReset} 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xs"
          >
            Reset Game (Dev)
          </button>
        </div>
    </GameLayout>
  );
}

export default App;
