import React from "react";

function Loading({ text = "جاري التحميل..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      {/* Spinner محسن */}
      <div className="relative w-14 h-14">
        <div className="w-14 h-14 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute top-0 left-0 w-14 h-14 rounded-full animate-spin border-t-4 border-(--primary-color) border-r-4 "></div>
      </div>

      {/* النص */}
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 tracking-tight">
        {text}
      </h3>
    </div>
  );
}

export default Loading;