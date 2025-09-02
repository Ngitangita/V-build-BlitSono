import { FaSpinner } from "react-icons/fa";

export const Loading = () => (
  <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <FaSpinner className="text-white text-4xl animate-spin" />
  </div>
);
