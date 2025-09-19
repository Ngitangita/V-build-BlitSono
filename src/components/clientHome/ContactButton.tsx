import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactDrawer from "./ContactDrawer";
import { FaPhone} from "react-icons/fa";

const ContactButton: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsContactOpen(true)}
        className="inline-flex items-center justify-center gap-2 bg-[#145e7a]
             text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition cursor-pointer"
            role="button"
      >
         <FaPhone /> Contactez-nous
      </button>

      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            key="contact-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex"
            onClick={() => setIsContactOpen(false)} 
          >
            <ContactDrawer onClose={() => setIsContactOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactButton;
