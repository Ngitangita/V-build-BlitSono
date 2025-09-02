import React, { useState, useEffect } from "react";

type ScrollTopButtonProps = {
  showBelow?: number;
}

const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({
  showBelow = 300,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset > showBelow;
      setVisible(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showBelow]);

  if (!visible) return null;

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="fixed bottom-4 right-4 p-3 bg-[#18769C] 
      text-white rounded-full shadow-lg hover:bg-[#0f5a70] transition-colors z-50 cursor-pointer"
      aria-label="Retour en haut"
    >
      ↑
    </button>
  );
};

export default ScrollTopButton;
