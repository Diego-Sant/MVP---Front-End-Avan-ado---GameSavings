import { useEffect, useState } from "react";

import GameCard from "@/components/GameCard";
import LoadingScreen from "@/components/LoadingScreen";

import Image from "next/image";

interface Game {
  id: string;
}

export default function EpicHighLights() {
  const [epicHighlights, setEpicHighlights] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEpicHighlights = async () => {
      try {
        const response = await fetch('/api/epicHighlight');
        const data = await response.json();

        setEpicHighlights(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchEpicHighlights();
  }, []);

  return (
    <main className="relative max-w-[1064px] m-auto w-[100%] flex flex-col justify-center lg:justify-start items-center lg:items-start">
      
      <div className="flex items-center gap-x-2 mb-4">
        <div className="w-[45px] h-[45px] bg-[#F28500] rounded-full flex items-center justify-center">
          <Image width={27} height={27} src="/images/Epic.svg" alt="Ícone da Epic Games" />
        </div>
        <p className="text-white uppercase text-[24px] font-semibold">Destaques Epic</p>
      </div>
      
      <div className="text-white flex flex-col items-center lg:items-stretch lg:flex-row w-[360px] sm:w-[1064px] h-[450px] gap-[10px]">

        <div className='flex flex-1 sm:flex-1 flex-col gap-[10px]'>
          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {epicHighlights[0] && (
              <GameCard data={epicHighlights[0]} useSecondThumbnail={true} />
            )}
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-[10px] flex-2'>

          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            <div className='flex flex-1 flex-col gap-[10px]'>
              <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
                {epicHighlights[1] && (
                  <GameCard data={epicHighlights[1]} useThirdThumbnail={true} />
                )}
              </div>
            </div>
          </div>

          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {epicHighlights[2] && (
              <GameCard data={epicHighlights[2]} useThirdThumbnail={true} />
            )}
          </div>

        </div>
      </div>
      {isLoading && <LoadingScreen />}
    </main>
  );
}
