import React from "react";
import { FaHeadphones } from "react-icons/fa";

type ScrollDownButtonProps = {
  targetId?: string;
  offset?: number;
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({
  targetId = "catalogue",
  offset = 10,
}) => {
  const scrollToSection = () => {
    const target = document.getElementById(targetId);
    if (target) {
      const topPos =
        target.getBoundingClientRect().top +
        window.pageYOffset +
        offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 1000, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToSection}
      className="inline-flex items-center gap-2 bg-white text-[#18769C]
             font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
      aria-label="Faire défiler vers le pack"
      type="button"
    >
      <FaHeadphones />
      Explorer notre catalogues
    </button>
  );
};

export default ScrollDownButton;
