import { useEffect, useState } from "react";

import GameCard from "@/components/GameCard";
import LoadingScreen from "@/components/LoadingScreen";

import Image from "next/image";

interface Game {
  id: string;
}

export default function KinguinHighLights() {
  const [kinguinHighlights, setKinguinHighlights] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKinguinHighlights = async () => {
      try {
        const response = await fetch('/api/kinguinHighlight');
        const data = await response.json();

        setKinguinHighlights(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchKinguinHighlights();
  }, []);

  return (
    <main className="relative max-w-[1064px] m-auto w-[100%] flex flex-col justify-center lg:justify-start items-center lg:items-start">
      
      <div className="flex items-center gap-x-2 mb-4">
        <div className="w-[45px] h-[45px] bg-[#F28500] rounded-full flex items-center justify-center">
          <Image width={30} height={30} src="/images/Kinguin.svg" alt="Ícone da Steam" />
        </div>
        <p className="text-white uppercase text-[24px] font-semibold">Destaques Kinguin</p>
      </div>
      
      <div className="text-white flex flex-col items-center lg:items-stretch lg:flex-row w-[360px] sm:w-[1064px] h-[450px] gap-[8px]">

        <div className='flex flex-1 sm:flex-1 flex-col gap-[10px]'>
          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {kinguinHighlights[0] && (
              <GameCard data={kinguinHighlights[0]} useSecondThumbnail={true} />
            )}
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-[10px] flex-2'>

          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            <div className='flex flex-1 flex-col gap-[10px]'>
              <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
                {kinguinHighlights[1] && (
                  <GameCard data={kinguinHighlights[1]} useThirdThumbnail={true} />
                )}
              </div>
            </div>
          </div>

          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {kinguinHighlights[2] && (
              <GameCard data={kinguinHighlights[2]} useThirdThumbnail={true} />
            )}
          </div>

        </div>
      </div>
      {isLoading && <LoadingScreen />}
    </main>
  );
}
