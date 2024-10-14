import React from "react";

interface CardSkeletonProps {
  length: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ length }) => {
  return (
    <div className="animate-pulse grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-4">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="block p-6 border rounded-xl shadow-[0px_0px_60px_30px_#00000008] bg-white"
        >
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          {Array.from({ length: 3 }).map((__, idx) => (
            <div key={idx} className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
