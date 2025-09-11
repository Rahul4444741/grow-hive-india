import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export default function FAQItem({ question, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 border-b border-gray-200 pb-6">
      <button onClick={() => setOpen((o) => !o)} className="flex justify-between items-center w-full text-left font-semibold text-gray-800 text-lg hover:text-purple-600">
        <span>{question}</span>
        <FaChevronDown className={`text-purple-600 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-4 text-gray-600">{children}</div>}
    </div>
  );
}
