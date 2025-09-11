import React from "react";

export default function WhatsAppFloat({ phone }) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 text-white rounded-full grid place-items-center shadow-xl hover:bg-green-600 transition z-50"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp text-3xl" />
    </a>
  );
}
