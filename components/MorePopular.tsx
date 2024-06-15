import { useEffect, useState } from "react";

import GameCard from "@/components/GameCard";

import Image from "next/image";

interface Game {
  id: string;
}

export default function MorePopular() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const shuffle = (array: Game[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        const data: Game[] = await response.json();

        const shuffledGames = shuffle(data).slice(0, 9);

        setGames(shuffledGames);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchGames();
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
      
        <div className="flex items-center gap-x-2 mb-4">
            <div className="w-[45px] h-[45px] bg-[#F28500] rounded-full flex items-center justify-center">
            <Image width={30} height={30} src="/images/MaisPopulares.svg" alt="Ícone de porcentagem" />
            </div>
            <p className="text-white uppercase text-[24px] font-semibold">Mais populares</p>
        </div>

        <div className="flex flex-col min-h-screen">
            <div className="justify-center grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-[6.5rem]">
                        
                {games.map((game) => (
                    <div key={game.id}>
                        <GameCard data={game} />
                    </div>
                ))}
                {isLoading && <LoadingScreen />}

            </div>
        </div>
      
    </main>
  );
}
