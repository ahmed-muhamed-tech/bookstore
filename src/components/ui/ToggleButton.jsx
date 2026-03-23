import { useState } from "react";

function ToggleButton({ initialState = false, onToggle }) {
  const [enabled, setEnabled] = useState(initialState);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="flex items-center gap-3 cursor-pointer" onClick={handleToggle}>
      {/* جسم الزرار الخارجي */}
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        {/* الدائرة المتحركة بالداخل */}
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
            enabled ? "-translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
   
    </div>
  );
}

export default ToggleButton;