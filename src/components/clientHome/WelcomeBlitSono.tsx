import React from "react";
import { FaVolumeUp, FaHeadphones } from "react-icons/fa";
import ContactButton from './ContactButton';

const WelcomeBlitSono: React.FC = () => {
  return (
    <section className="bgImage">
      <div
        className="
          bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
          text-white w-full flex flex-col px-4 py-8 pl-20 pt-20
        "
      >
        <h1 className="
          text-2xl sm:text-3xl md:text-4xl xl:text-5xl
          font-extrabold mb-4 text-center flex
          items-center justify-center gap-2
        ">
          <span><FaVolumeUp className="text-[#18769C]" /></span>
          Bienvenue chez Blit Sono 
          Là où chaque son compte !
        </h1>

        <p className="
          w-full text-sm sm:text-base md:text-lg xl:text-xl 
          max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 
          italic mb-6 text-center sm:text-left 
          border-l-4 border-[#18769C] pl-4
        ">
          Blit Sono vous accompagne pour vos événements avec un service fiable
          et attentionné, en proposant des équipements son et lumière
          professionnels, un système de réservation simple et une équipe à
          l'écoute.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <a
            href="/catalogues"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#18769C] 
            font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            role="button"
          >
            <FaHeadphones /> Explorer notre catalogue
          </a>
            <ContactButton />
        </div>
      </div>
    </section>
  );
};

export default WelcomeBlitSono;
