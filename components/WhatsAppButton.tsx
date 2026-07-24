"use client";

import { useState, useEffect } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = "8801625927788"; // আপনার WhatsApp নম্বর দিন
  const message = "Hi OPARZO! I have a question about your products.";

  useEffect(() => {
    // পেজ লোড হওয়ার পর বাটনটি দেখান (স্মুথ অ্যানিমেশনের জন্য)
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
      >
        <path d="M12.032 21.965c-1.862 0-3.678-.5-5.297-1.475l-4.244 1.392 1.394-4.185C3.102 16.401 2.5 14.676 2.5 12.83c0-5.257 4.276-9.534 9.532-9.534 5.256 0 9.532 4.277 9.532 9.534 0 5.257-4.276 9.533-9.532 9.533zm0-17.533c-4.407 0-7.993 3.586-7.993 7.993 0 1.724.553 3.332 1.49 4.637l-.954 2.867 2.928-.964c1.306.838 2.868 1.307 4.529 1.307 4.408 0 7.994-3.586 7.994-7.993 0-4.408-3.586-7.994-7.994-7.994zm4.417 9.739c-.059-.029-.628-.311-1.097-.527-.36-.163-.673-.234-.95.074-.237.273-.513.417-.834.581-.188.094-.412.034-.573-.071-.313-.203-.616-.486-.856-.789-.216-.273-.459-.68-.49-.841-.013-.066.005-.121.066-.163.052-.035.091-.069.135-.113.067-.067.097-.115.152-.226.052-.111.026-.179-.013-.27-.013-.026-.793-1.916-.85-2.054-.076-.185-.151-.282-.319-.324-.146-.037-.382-.038-.539-.038-.153 0-.379.054-.579.27-.291.313-.623.786-.623 1.513 0 .728.529 1.432.603 1.532.074.099 1.05 1.602 2.534 2.145.354.13.625.237.877.288.163.031.391.023.507-.06.121-.087.511-.592.57-.742.089-.224.155-.356.282-.528.121-.169.242-.224.402-.344.159-.12.326-.134.485-.079.199.051 1.056.521 1.237.616.179.095.325.166.461.237-.006.016-.068.153-.153.285-.239.369-.693.705-.831.788-.206.124-.438.175-.677.176-.129 0-.264-.011-.405-.033z"/>
      </svg>
    </button>
  );
}
