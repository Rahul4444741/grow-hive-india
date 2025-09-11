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

export default function CourseCard({ title, img, price, oldPrice, badge, rating, reviews, tag, instructor, ratingTag }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md course-card card-glow">
      <div className="relative">
        <img src={img} alt={title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
        {badge?.text && (
          <div className={`absolute top-4 right-4 text-white text-xs px-3 py-1 rounded-full font-bold ${
            badge.color === 'primary' ? 'bg-purple-600' : badge.color === 'secondary' ? 'bg-emerald-600' : 'bg-purple-600'}`}>{badge.text}</div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20" />
        <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
          <StarRow rating={rating} />
          <span className="text-sm">({reviews})</span>
          {ratingTag?.text && (
            <span className={`text-xs px-2 py-1 rounded ${
              ratingTag.color === 'green' ? 'bg-green-500' : ratingTag.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
            }`}>{ratingTag.text}</span>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {tag && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">{tag}</span>}
        </div>
        <div className="flex items-center mb-4">
          {instructor?.avatar && <img src={instructor.avatar} alt={instructor?.name} className="w-8 h-8 rounded-full mr-2" />}
          <span className="text-sm text-gray-600">By {instructor?.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-gray-900">{price === 0 ? 'FREE' : `₹${price}`}</span>
            {oldPrice && <span className="text-sm text-gray-500 line-through ml-2">₹{oldPrice}</span>}
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Enroll Now <i className="fas fa-arrow-right ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}