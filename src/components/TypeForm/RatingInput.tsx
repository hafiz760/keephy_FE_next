import React from "react";
import RatingIcon from "@/assets/icons/rating";
interface RatingInputProps {
  label?: string;
  name?: string;
  value?: number;
  onChange?: (name: string, value: number) => void;
  maxRating?: number;
  iconSize?: number;
  review?: boolean;
}

const RatingInput: React.FC<RatingInputProps> = ({
  label = "",
  name = "",
  value,
  onChange = () => {},
  maxRating = 5,
  iconSize = 16,
  review,
}) => {
  const handleRating = (rating: number) => {
    onChange(name, rating);
  };

  return (
    <div>
      {label && <label className="block text-gray-700">{label}</label>}
      <div
        className={
          review ? "bg-white border border-[#EDEDED] px-3 py-2 rounded-xl" : ""
        }
      >
        {[...Array(maxRating)].map((_, i) => (
          <button
            key={i}
            type="button"
            className={`p-1`}
            onClick={() => handleRating(i + 1)}
          >
            <RatingIcon
              size={iconSize}
              color={value && i + 1 <= value ? "#eab308" : "#9ca3af"}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingInput;
