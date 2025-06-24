import { useState, useCallback } from 'react';
import { OvercookedGameState, initialGameState, CharacterName, ChefDialogue } from '../types/gameTypes';

// Context could be used for larger applications, but for now, hooks are fine as requested.
// export const GameStateContext = React.createContext<{
//   gameState: OvercookedGameState;
//   setGameState: React.Dispatch<React.SetStateAction<OvercookedGameState>>;
// } | null>(null);

export const useKitchenState = () => {
  const [gameState, setGameState] = useState<OvercookedGameState>(initialGameState);

  // Example action: Advance to the next puzzle
  const advancePuzzle = useCallback(() => {
    setGameState(prev => {
      if (prev.currentPuzzle < 4) { // Assuming 4 puzzles before conclusion
        const newCompletedPuzzles = [...prev.completedPuzzles];
        if(prev.currentPuzzle > 0) newCompletedPuzzles[prev.currentPuzzle -1] = true;
        
        let newChaos: OvercookedGameState['chaosLevel'] = prev.chaosLevel;
        let newEfficiency = prev.kitchenEfficiency;
        let newServiceTime = prev.serviceTime;

        // Simplified progression logic
        if (prev.currentPuzzle + 1 === 1) { /* Starting Puzzle 1 */ }
        if (prev.currentPuzzle + 1 === 2) { newEfficiency = 7; newServiceTime = 39; newChaos = 'MESSY';}
        if (prev.currentPuzzle + 1 === 3) { newEfficiency = 6; newServiceTime = 30; }
        if (prev.currentPuzzle + 1 === 4) { newEfficiency = 4; newServiceTime = 5; newChaos = 'ORGANIZED'; }
        if (prev.currentPuzzle + 1 > 4) { newChaos = 'OVERBOOKED'; }


        return {
          ...prev,
          currentPuzzle: prev.currentPuzzle + 1,
          completedPuzzles: newCompletedPuzzles,
          chaosLevel: newChaos,
          kitchenEfficiency: newEfficiency,
          serviceTime: newServiceTime,
          // Reset puzzle-specific states or update based on progression
          identifiedKitchenProblems: prev.currentPuzzle + 1 === 1 ? prev.identifiedKitchenProblems : [], 
          // etc. for other puzzle states
        };
      }
      return prev; // Or handle conclusion state
    });
  }, []);

  // Example action: Set character dialogue
  const setDialogue = useCallback((character: CharacterName, line: string, emotion?: ChefDialogue['emotion']) => {
    setGameState(prev => ({
      ...prev,
      currentChef: character,
      dialogueState: { character, line, emotion },
    }));
  }, []);
  
  // Add more specific state update functions here as needed, e.g.:
  // const identifyProblem = (problem: KitchenProcess) => { ... }
  // const updateCookingTime = (stepId: string, time: number) => { ... }

  return {
    gameState,
    setGameState, // Exposing raw setState is powerful but can be risky; consider more specific setters
    advancePuzzle,
    setDialogue,
  };
};

// Custom hooks for specific logic as requested (will be built out more in future phases)

export const useCookingValidation = () => {
  // Logic for checking recipe completion, proper sequence, timing
  const validateStep = (step: any /* CookingStep */, ingredients: any[] /* Ingredient[] */) => {
    console.log("Validating step:", step, "with ingredients:", ingredients);
    // Placeholder validation
    return Math.random() > 0.3; // Simulate 70% success
  };
  return { validateStep };
};

export const useServiceProgress = () => {
  // Logic for handling customer service improvements, satisfaction updates
  const updateSatisfaction = (newLevel: number) => {
    console.log("Updating customer satisfaction to:", newLevel);
    // Potentially update overall gameState here via a setter from useKitchenState if passed in
  };
  return { updateSatisfaction };
};

export const useChefDialogue = (setGameState: React.Dispatch<React.SetStateAction<OvercookedGameState>>) => {
  // Manages character interactions, possibly sequences of dialogue
  const triggerDialogue = (character: CharacterName, line: string, emotion?: ChefDialogue['emotion']) => {
    const puns = [
      "Let's spice things up!",
      "Time to turn up the heat!",
      "This is souper important!",
      "Don't be chicken, let's do this!",
      "Lettuce begin!",
    ];
    const fullLine = `${line} ${puns[Math.floor(Math.random() * puns.length)]}`;
    
    setGameState(prev => ({
      ...prev,
      currentChef: character,
      dialogueState: { character, line: fullLine, emotion },
    }));
  };
  
  const clearDialogue = () => {
     setGameState(prev => ({ ...prev, dialogueState: null }));
  }

  return { triggerDialogue, clearDialogue };
};
