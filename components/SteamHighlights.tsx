import { useEffect, useState } from "react";

import GameCard from "@/components/GameCard";

import Image from "next/image";

interface Game {
  id: string;
}

export default function SteamHighLights() {
  const [steamHighlights, setSteamHighlights] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSteamHighlights = async () => {
      try {
        const response = await fetch('/api/steamHighlight');
        const data = await response.json();

        setSteamHighlights(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchSteamHighlights();
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
          <Image width={30} height={30} src="/images/Steam.svg" alt="Ícone da Steam" />
        </div>
        <p className="text-white uppercase text-[24px] font-semibold">Destaques Steam</p>
      </div>
      
      <div className="text-white flex flex-col items-center lg:items-stretch lg:flex-row w-[360px] sm:w-[1064px] h-[450px] gap-[10px]">

        <div className='flex flex-1 sm:flex-1 flex-col gap-[10px]'>
          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {steamHighlights[0] && (
              <GameCard data={steamHighlights[0]} useSecondThumbnail={true} />
            )}
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-[10px] flex-2'>

          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            <div className='flex flex-1 flex-col gap-[10px]'>
              <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
                {steamHighlights[1] && (
                  <GameCard data={steamHighlights[1]} useThirdThumbnail={true} />
                )}
              </div>
            </div>
          </div>

          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {steamHighlights[2] && (
              <GameCard data={steamHighlights[2]} useThirdThumbnail={true} />
            )}
          </div>

        </div>
      </div>
      {isLoading && <LoadingScreen />}
    </main>
  );
}
