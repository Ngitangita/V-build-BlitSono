import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

type NavItem = { label: string; to: string };

const faqItems: string[] = [
  "Questions les + fréquentes",
  "Gamme et Stock",
  "Paiements",
  "Expédition & Livraison",
];

const productLinks: NavItem[] = [
  { label: "Accueil", to: "/" },
  { label: "Sonorisation", to: "/catalogues" },
  { label: "Deejay", to: "/catalogues" },
  { label: "Éclairage", to: "/catalogues" },
  { label: "Home studio", to: "/catalogues" },
  { label: "Instruments de musique", to: "/catalogues" },
  { label: "HiFi & vidéo", to: "/catalogues" },
  { label: "Câblerie", to: "/catalogues" },
  { label: "Structure", to: "/catalogues" },
  { label: "Flight case", to: "/catalogues" },
];

const Footer: React.FC = () => (
  <footer className="bg-[#1E2939] text-white py-8">
    <div
      className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 
     md:grid-cols-3 lg:grid-cols-5 gap-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Blit Sono</h3>
        <p className="text-sm mb-4">
          Votre partenaire pour la sonorisation, l'éclairage et les équipements
          audio professionnels à Madagascar.
        </p>
        <p className="text-sm">© 2025 Blit Sono. Tous droits réservés.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Vos questions</h3>
        <ul className="space-y-2 text-sm">
          {faqItems.map((item, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="block hover:text-[#18769C] transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav>
        <h3 className="text-lg font-semibold mb-4">Produits</h3>
        <ul className="space-y-2 text-sm">
          {productLinks.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className="block hover:text-[#18769C] transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
        <p className="text-xl font-bold mb-1">+261 (0)34 71 026 04</p>
        <p>contact@beloyalit.com</p>
        <p className="text-sm mb-4">7j/7 & 24h/24</p>
        <a
          href="https://www.facebook.com/blit.sono"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white 
            font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50
          "
        >
          Contactez-nous sur MP
        </a>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
        <div className="flex space-x-4 mb-4">
          <a
            href="https://www.facebook.com/blit.sono"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="
              p-3 bg-[#18769C] hover:bg-[#0f5a70] rounded-full
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50
            "
          >
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/blit.sono"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="
              p-3 bg-[#18769C] hover:bg-[#0f5a70] rounded-full
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50
            "
          >
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>
        <h3 className="text-lg font-semibold mb-2">Alerte bons plans !</h3>
        <Link
          to="/sign-up"
          className="
            inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white
            font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50
          "
        >
          Je m'inscris
        </Link>
      </div>
    </div>
  </footer>
);
export default Footer;
