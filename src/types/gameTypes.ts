// src/types/gameTypes.ts

export interface KitchenProcess {
  id: string;
  name: string;
  description: string;
  // Add other relevant properties like time, resources, etc.
}

export interface CookingStep {
  id: string;
  processId: string; // links to a KitchenProcess
  duration: number; // in minutes or seconds
  order: number;
  // Add other relevant properties
}

export type WasteType = 
  | 'TRANSPORTATION' 
  | 'INVENTORY' 
  | 'MOTION' 
  | 'WAITING' 
  | 'OVER_PRODUCTION' 
  | 'OVER_PROCESSING' 
  | 'DEFECTS'
  | 'INTELLECT' // (TIMWOOD-I)
  ;

export interface KitchenZone {
  id: string;
  name: string; // e.g., "Prep Station", "Cooking Station"
  assignedProcesses: string[]; // list of KitchenProcess IDs
  equipment: string[]; // e.g., ["Cutting Board", "Knife"]
}

export type CharacterName = 'Heidi' | 'Leon' | 'Malik' | 'Beau';

export interface ChefDialogue {
  character: CharacterName;
  line: string;
  image?: string; // Path to character image/avatar
  emotion?: 'happy' | 'confused' | 'surprised' | 'neutral';
}

export interface OvercookedGameState {
  currentPuzzle: number; // 1 to 4 (or 0 for intro, 5 for conclusion)
  completedPuzzles: boolean[]; // Array of 4 booleans

  kitchenEfficiency: number; // Number of processes (8 -> 7 -> 6 -> 4)
  serviceTime: number; // Total service time in minutes (45 -> 39 -> 30 -> 5)
  customerSatisfaction: number; // Percentage 0-100

  chaosLevel: 'DISASTER' | 'MESSY' | 'ORGANIZED' | 'OVERBOOKED';

  // Puzzle 1: Gemba Walk
  identifiedKitchenProblems: KitchenProcess[]; // Store identified processes/problems

  // Puzzle 2: Value Stream Mapping (Cooking Flow Mapping)
  cookingTimings: CookingStep[]; // Stores the timed steps
  combinedStations: string[]; // IDs of processes that were combined

  // Puzzle 3: TIMWOOD-I (Kitchen Waste Hunt)
  wasteSpotted: WasteType[]; // Types of waste identified
  eliminatedWaste: string; // Description or ID of the eliminated waste process

  // Puzzle 4: 5S Implementation (Kitchen Organization)
  workStationSetup: KitchenZone[]; // Configuration of the 4 workstations

  // Character interactions
  currentChef: CharacterName;
  dialogueState: ChefDialogue | null;
}

export const initialGameState: OvercookedGameState = {
  currentPuzzle: 0, // Start at introduction
  completedPuzzles: [false, false, false, false],
  kitchenEfficiency: 8,
  serviceTime: 45,
  customerSatisfaction: 20, // Start low
  chaosLevel: 'DISASTER',
  identifiedKitchenProblems: [],
  cookingTimings: [],
  combinedStations: [],
  wasteSpotted: [],
  eliminatedWaste: '',
  workStationSetup: [],
  currentChef: 'Malik', // Head chef starts the game
  dialogueState: {
    character: 'Malik',
    line: "Welcome to the kitchen, rookie! It's a bit of a mess, isn't it? We need to get this place in order!"
  },
};
