import React from "react";
// imports
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

// ⭐ Robust star row (handles 4.5, 4.0, etc.)
const StarRow = ({ rating = 0, outOf = 5, className = "" }) => {
  const clamped = Math.max(0, Math.min(outOf, rating));
  const rounded = Math.round(clamped * 2) / 2;       // nearest 0.5
  const full = Math.floor(rounded);
  const half = rounded - full === 0.5 ? 1 : 0;
  const empty = outOf - full - half;

  return (
    <div
      className={`flex items-center text-yellow-400 ${className}`}
      aria-label={`${rounded} out of ${outOf} stars`}
    >
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {half === 1 && <FaStarHalfAlt key="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};

export default function ProductCard({ title, img, price, oldPrice, badge, rating, reviews }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md group">
      <div className="relative overflow-hidden">
        <img src={img} alt={title} className="w-full h-60 object-cover transition duration-500 group-hover:scale-110" />
        {badge?.text && (
          <div
            className={`absolute top-4 left-4 text-white text-xs px-2 py-1 rounded-full font-bold ${
              badge.color === "red"
                ? "bg-red-500"
                : badge.color === "green"
                ? "bg-green-500"
                : badge.color === "blue"
                ? "bg-blue-500"
                : "bg-purple-500"
            }`}
          >
            {badge.text}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <button className="text-gray-400 hover:text-red-500">
            <i className="far fa-heart" />
          </button>
        </div>
        <div className="flex items-center mb-3 gap-2">
          <StarRow rating={rating} />
          <span className="text-gray-600 text-sm">({reviews} reviews)</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-gray-900">₹{price}</span>
            {oldPrice && <span className="text-sm text-gray-500 line-through ml-2">₹{oldPrice}</span>}
          </div>
          <button className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700 transition">
            <i className="fas fa-shopping-cart" />
          </button>
        </div>
      </div>
    </div>
  );
}
