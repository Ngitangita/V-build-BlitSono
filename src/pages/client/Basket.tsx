import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import BasketForm from "../../components/clientHome/BasketForm";
import type { CartItem } from "../../types/cart";

export default function Basket() {
  const items = useCartStore((s) => s.items as CartItem[]);
  const remove = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2);

  return (
    <div className="p-6 flex flex-col gap-8">
      <title>Panier - Finalisez votre réservation</title>
      <h1 className="text-4xl font-bold text-[#18769C]">Votre panier</h1>

      {items.length === 0 ? (
        <>
          <div className="flex justify-center items-center">
            <div className="bg-white border border-[#18769C] rounded-lg p-8 text-center w-[800px] h-[400px] flex flex-col justify-center items-center gap-8">
              <h3 className="font-semibold text-2xl text-[#18769C]">
                Votre panier est vide.
              </h3>
              <img
                src="/shopping.jpeg"
                alt="Panier vide"
                className="w-50 mx-auto transform -rotate-180 hover:rotate-0 transition cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-12 justify-center">
            {[{
              title: "Vous aviez ajouté des articles à votre panier ?",
              text: "Connectez-vous pour les retrouver et finaliser votre commande.",
              buttonText: "Je me connecte",
              link: "/sign-in",
            },
            {
              title: "Vous n'avez pas encore de compte ?",
              subtitle: "Inscrivez-vous !",
              text: "Sauvegardez votre panier et recevez nos promos.",
              buttonText: "Je crée mon compte",
              link: "/sign-up",
            }].map(({ title, subtitle, text, buttonText, link }) => (
              <div key={link} className="flex-1 flex flex-col items-center text-center gap-4">
                <h2 className="font-semibold text-lg text-[#575756]">{title}</h2>
                {subtitle && <h3 className="font-semibold text-md text-[#575756]">{subtitle}</h3>}
                <p className="max-w-md text-start text-[#575756]">{text}</p>
                <Link to={link}>
                  <button className="w-64 cursor-pointer p-3 rounded bg-gradient-to-r from-[#18769C]/20 to-[#18769C] text-white hover:from-[#18769C] hover:to-[#18769C]/20 transition">
                    {buttonText}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white p-6 flex flex-row gap-2 flex-wrap justify-between items-start">
          <div className="p-8 text-center w-[400px] border-r border-[#18769C]">
            <p className="font-semibold text-2xl text-[#18769C]">
              Bravo ! Vous avez glissé ce matériel dans votre malle : votre panier s'enrichit !
            </p>
            <img
              src="/location-malle-de-transport.jpg"
              alt="Panier rempli"
              className="w-48 mx-auto"
            />
          </div>

          <BasketForm items={items}  total={Number(total)}  remove={remove} updateQuantity={updateQuantity} />
        </div>
      )}
    </div>
  );
}
