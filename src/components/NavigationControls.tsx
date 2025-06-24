import React from 'react';

interface NavigationControlsProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onHelp?: () => void;
  canProceed?: boolean;
  canGoBack?: boolean;
  isLoading?: boolean;
}

// Placeholder icons - ideally SVGs or image components
const NextIcon = () => <span role="img" aria-label="next">➡️</span>;
const PrevIcon = () => <span role="img" aria-label="previous">⬅️</span>;
const HelpIcon = () => <span role="img" aria-label="help">❓</span>; // Kitchen utensil like a spatula could be fun

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onNext,
  onPrevious,
  onHelp,
  canProceed = true,
  canGoBack = true,
  isLoading = false,
}) => {
  const baseButtonClass = "px-5 py-3 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2";
  const primaryButtonClass = `${baseButtonClass} bg-overbooked-orange text-white hover:bg-orange-600 focus:ring-overbooked-orange`;
  const secondaryButtonClass = `${baseButtonClass} bg-overbooked-yellow text-gray-800 hover:bg-yellow-500 focus:ring-overbooked-yellow`;
  const helpButtonClass = `${baseButtonClass} bg-overbooked-green text-white hover:bg-green-600 focus:ring-overbooked-green`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 p-3">
      {onHelp && (
        <button onClick={onHelp} className={helpButtonClass} aria-label="Help">
          <HelpIcon /> 
          <span>Help</span>
        </button>
      )}
      {onPrevious && (
        <button onClick={onPrevious} disabled={!canGoBack || isLoading} className={secondaryButtonClass} aria-label="Previous Step">
          <PrevIcon />
          <span>Back</span>
        </button>
      )}
      {onNext && (
        <button onClick={onNext} disabled={!canProceed || isLoading} className={primaryButtonClass} aria-label="Next Step">
          <span>{isLoading ? "Loading..." : "Next"}</span>
          {!isLoading && <NextIcon />}
        </button>
      )}
    </div>
  );
};

export default NavigationControls;
