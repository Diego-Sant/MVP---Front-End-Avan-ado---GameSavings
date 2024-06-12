import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard"; // Importando o componente GameCard
import Image from "next/image";

interface Game {
  id: string;
}

export default function LowerPrices() {
  const [highlights, setHighlights] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch('/api/highlight');
        const data = await response.json();

        setHighlights(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar destaques:", error);
      }
    };

    fetchHighlights();
  }, []);

  const LoadingScreen = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="lds-heart"><div></div></div>
      </div>
    );
  };

  return (
    <main className="relative max-w-[1064px] m-auto w-[100%] flex flex-col justify-center lg:justify-start items-center lg:items-start">
      
      <div className="flex items-center gap-x-2 mb-2">
        <div className="w-[45px] h-[45px] bg-[#F28500] rounded-full flex items-center justify-center">
          <Image width={25} height={23} src="/images/MenorPreco.svg" alt="Ícone de fogo" />
        </div>
        <p className="text-white uppercase text-[24px] font-semibold">Menores preços</p>
      </div>

      <div className="text-white flex flex-col sm:flex-row h-[450px] gap-[10px]">
        
      </div>
      {isLoading && <LoadingScreen />}
    </main>
  );
}
