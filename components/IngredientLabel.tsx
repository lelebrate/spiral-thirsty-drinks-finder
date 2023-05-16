import React from 'react';

interface IngredientLabelProps {
  color: string;
  label: string;
}

const IngredientLabel: React.FC<IngredientLabelProps> = ({ color, label }) => {
  return (
    <div className="flex items-center mb-5 ml-5 mr-5 mt-5">
      <div
        className="w-5 h-5 mr-2 rounded-full"
        style={{
          backgroundColor: color,
        }}
      />
      <p className="text-base">{label}</p>
    </div>
  );
};

export default IngredientLabel;
