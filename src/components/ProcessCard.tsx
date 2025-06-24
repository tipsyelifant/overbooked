import React from 'react';

interface ProcessCardProps {
  id: string;
  title: string;
  description: string;
  icon?: string; // Placeholder for ingredient/tool icon
  color?: string; // To make cards colorful
  isDraggable?: boolean;
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  id,
  title,
  description,
  icon = "🍲", // Default food icon
  color = "bg-overbooked-green", // Default color
  isDraggable = false,
}) => {
  const cardClasses = `
    p-4 rounded-xl shadow-lg text-white 
    transform transition-all duration-200 ease-in-out
    hover:scale-105 hover:shadow-2xl
    ${color}
    ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}
  `;

  return (
    <div className={cardClasses} data-id={id}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        {icon && <span className="text-3xl" role="img" aria-label="process icon">{icon}</span>}
      </div>
      <p className="text-sm opacity-90">{description}</p>
      {isDraggable && (
        <div className="mt-3 text-xs opacity-70 text-right italic">
          Drag me!
        </div>
      )}
    </div>
  );
};

export default ProcessCard;
