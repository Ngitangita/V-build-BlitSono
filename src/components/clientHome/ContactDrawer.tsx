import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

type Props = {
  onClose: () => void;
};

const ContactDrawer: React.FC<Props> = ({ onClose }) => {
  return (
    <motion.div
      key="contact-drawer"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }} 
      transition={{ type: "tween", duration: 0.4 }}
      className="ml-auto h-full w-1/2 md:w-1/3 lg:w-1/4 bg-white shadow-2xl z-40 overflow-y-auto"
      onClick={(e) => e.stopPropagation()} 
      aria-modal="true"
      role="dialog"
    >
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          aria-label="Close contact panel"
          className="text-gray-600 hover:text-white text-2xl hover:bg-red-600 cursor-pointer p-4"
        >
          ✕
        </button>
      </div>

      <div className="pb-8">
        <ContactForm />
      </div>
    </motion.div>
  );
};

export default ContactDrawer;
