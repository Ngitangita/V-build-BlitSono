import type { JSX } from "react";
import { useEffect, useState } from "react";
import axiosClient from "../../conf/axiosClient";
import type { PacksType } from "../../types/types";
import Packs from "../../components/clientHome/Packs";
import Materiels from "../../components/clientHome/Materiels";
import WelcomeBlitSono from "../../components/clientHome/WelcomeBlitSono";

function HomePage(): JSX.Element {
  const [packItems, setPackItems] = useState<PacksType[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const { data } = await axiosClient.get<PacksType[]>("/bundles");
        setPackItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des packs");
      }
    };
    fetchPacks();
  }, []);

  return (
    <div>
      <title>Accueil | Blit Sono - Événements en musique</title>
      <WelcomeBlitSono />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <Packs packItems={packItems} />
      <Materiels />
    </div>
  );
}

export default HomePage;
