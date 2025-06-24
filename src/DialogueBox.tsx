import React from 'react';

type CharacterName = 'Heidi' | 'Leon' | 'Malik' | 'Beau';

interface CharacterDialogueProps {
  character: CharacterName;
  message: string;
  isThinking?: boolean; // For thought bubbles
}

// Placeholder for character portraits - will be replaced with actual images/SVGs
const getCharacterPortrait = (character: CharacterName) => {
  switch (character) {
    case 'Heidi': return '👩‍🍳H'; // Young chef, bright-eyed
    case 'Leon': return '👨‍🍳L'; // Experienced chef
    case 'Malik': return '🧑‍🍳M'; // Head chef, authoritative
    case 'Beau': return '🤵B'; // Waiter, friendly
    default: return '👤';
  }
};

const CharacterDialogue: React.FC<CharacterDialogueProps> = ({ character, message, isThinking }) => {
  const bgColor = isThinking ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300';
  const textColor = isThinking ? 'text-blue-700' : 'text-gray-800';
  const portraitBgColor = character === 'Heidi' ? 'bg-overbooked-green' : 
                         character === 'Leon' ? 'bg-overbooked-yellow' :
                         character === 'Malik' ? 'bg-overbooked-red text-white' :
                         'bg-gray-400 text-white';

  return (
    <div className={`flex items-end space-x-3 p-3 max-w-md mx-auto my-4`}>
      <div className={`w-16 h-16 rounded-full ${portraitBgColor} flex items-center justify-center text-3xl font-bold shadow-md border-2 border-white flex-shrink-0`}>
        {getCharacterPortrait(character)}
      </div>
      <div className={`relative ${bgColor} ${textColor} p-4 rounded-t-xl rounded-br-xl shadow-lg border-2 ${isThinking ? 'rounded-bl-xl' : 'rounded-bl-none'} transform transition-all duration-300 hover:scale-105`}>
        <p className="text-sm sm:text-base">{message}</p>
        {!isThinking && (
          <div className="absolute left-0 bottom-0 transform translate-x-[-9px] translate-y-[9px]">
            <svg width="20" height="20" viewBox="0 0 100 100" className="fill-current text-white dark:text-gray-800">
                 <path d="M0 0 C0 0, 0 100, 50 100 L100 100 L100 0 Z" strokeWidth="2" className={`stroke-current ${isThinking ? 'text-blue-300' : 'text-gray-300'}`} />
                 <path d="M0 0 C0 0, 0 100, 50 100 L100 100 L100 0 Z" />
            </svg>
          </div>
        )}
         {isThinking && (
            <div className="absolute top-2 right-2 text-2xl opacity-50">💭</div>
         )}
      </div>
    </div>
  );
};

export default CharacterDialogue;
