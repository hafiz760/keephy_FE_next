import React from "react";

interface PlanCardSkeletonProps {
  length: number;
}

const PlanCardSkeleton: React.FC<PlanCardSkeletonProps> = ({ length }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="p-6 animate-pulse border rounded-xl shadow-[0px_0px_60px_30px_#00000008] bg-white flex flex-col items-center"
        >
          <div className="h-8 bg-gray-200 rounded mb-4 w-2/4"></div>
          {Array.from({ length: 3 }).map((__, idx) => (
            <div key={idx} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          ))}
          <div className="h-10 bg-gray-200 rounded mb-6 w-2/4 mt-4"></div>
          {Array.from({ length: 4 }).map((__, idx) => (
            <div key={idx} className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          ))}
        </div>
      ))}
    </>
  );
};

export default PlanCardSkeleton;
