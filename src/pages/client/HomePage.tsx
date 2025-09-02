import type { JSX } from "react";
import Packs from "../../components/clientHome/Packs";
import Materiels from "../../components/clientHome/Materiels";
import WelcomeBlitSono from "../../components/clientHome/WelcomeBlitSono";
import { packItems } from "../../data/packItems";


 function HomePage(): JSX.Element {

  return (
    <div>
        <title>Accueil | Blit Sono - Événements en musique</title>
      <WelcomeBlitSono/>
      <Packs packItems={packItems}/>
      <Materiels />
    </div>
  );
}

export default HomePage;