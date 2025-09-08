import { Link } from "react-router-dom";
import type { PackItems } from "../../types/types";
import { FaThumbsUp, FaHandPointRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  packItems: PackItems[];
  autoScrollIntervalMs?: number;
};

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="w-10 text-center p-2 pt-0 text-5xl text-[#18769C]/50 relative 
      bottom-20 left-[99%]
      bg-[#F3F4F6] hover:bg-[#1E2939] hover:text-[#18769C] rounded cursor-pointer z-10"
      onClick={onClick}
    >
      ›
    </div>
  );
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="w-10 text-center p-2 pt-0 text-5xl text-[#18769C]/50 relative right-10 top-20
      bg-[#F3F4F6] hover:bg-[#1E2939] hover:text-[#18769C] rounded cursor-pointer z-10"
      onClick={onClick}
    >
      ‹
    </div>
  );
} 


export default function Packs({
  packItems,
  autoScrollIntervalMs = 5000,
}: Props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoScrollIntervalMs,
    arrows: true,
    responsive: [
      {
        breakpoint: 1536, 
        settings: {
             dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoScrollIntervalMs,
    arrows: true,
        },
      },
      {
        breakpoint: 1280, 
        settings: {
             dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoScrollIntervalMs,
    arrows: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
            dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoScrollIntervalMs,
    arrows: true,
        },
      },
      {
        breakpoint: 768, 
        settings: {
             dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoScrollIntervalMs,
    arrows: true,
        },
      },
      {
        breakpoint: 640, 
        settings: {
            dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoScrollIntervalMs,
    arrows: true,
        },
      },
      {
        breakpoint: 479, 
        settings: {
            dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoScrollIntervalMs,
    arrows: true,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="text-[#18769C] w-full flex flex-col gap-4 pt-6 sm:pt-10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-extrabold mb-2 sm:mb-4 flex items-center gap-3">
          <FaThumbsUp size={24} className="shrink-0" /> Nos packs sur mesure
        </h1>
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#575756] flex items-center border-l-4 border-[#18769C] pl-3 sm:pl-4">
          Explorez nos différents packs thématiques : sonorisation, éclairage,
          DJ, studio, etc. Chaque pack est soigneusement pensé pour répondre à
          des besoins précis. Que vous soyez organisateur d'événement, artiste
          ou amateur passionné, vous trouverez ici des solutions prêtes à
          l'emploi.
        </p>
        <p className="italic text-xs sm:text-sm lg:text-base">
          <FaHandPointRight
            size={18}
            className="inline mr-2 text-[#1E2939]"
          />
          Visitez les fiches de chaque pack pour découvrir les détails, les
          équipements inclus, et choisir celui qui correspond le mieux à votre
          projet.
        </p>
      </div>

      <div className="relative pt-4 sm:pt-6 pb-6 pr-4 sm:pr-10 pl-4 sm:pl-10">
        <Slider {...settings}>
          {packItems.map((m) => (
            <div key={m.id} className="px-1 sm:px-2">
              <Link
                to={`/pack-detail/${m.id}`}
                className="block w-full h-full"
              >
                <div
                  className="rounded-lg p-3 sm:p-4 shadow-md hover:scale-105 transition 
                             duration-300 ease-in-out bg-white hover:shadow-lg group"
                >
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 group-hover:text-[#18769C]">
                    {m.description}
                  </p>
                  <h3 className="mt-2 font-semibold text-sm sm:text-base lg:text-lg text-gray-800 group-hover:text-[#18769C]">
                    {m.nom}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1 group-hover:text-[#18769C]">
                    Prix : <strong>{m.prix_location} Ar</strong>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

