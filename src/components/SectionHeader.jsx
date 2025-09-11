import React from "react";

export default function SectionHeader({ eyebrow, title, highlight, subTitle }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
      <div className="flex flex-col w-full mx-auto">
        {eyebrow && (
          <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full mx-auto mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">
          {title} {highlight && <span className="gradient-text">{highlight}</span>}
        </h2>
        <p className="text-xl md:text-2xl font-medium text-gray-500 text-center px-3 border-4">
          {subTitle}
        </p>
      </div>
    </div>
  );
}
