import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard"; // Importando o componente GameCard

interface Game {
  id: string;
}

export default function HighLights() {
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
    <main className="relative max-w-[1064px] m-auto w-[100%]">
      <div className="text-white flex flex-col sm:flex-row h-[450px] gap-[10px]">
        <div className='flex flex-1 sm:flex-1 flex-col gap-[10px]'>
          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {highlights[0] && (
              <GameCard data={highlights[0]} useSecondThumbnail={true} />
            )}
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-[10px] flex-2'>
          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            <div className='flex flex-1 flex-col gap-[10px]'>
              <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
                {highlights[1] && (
                  <GameCard data={highlights[1]} useThirdThumbnail={true} />
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {highlights[2] && (
              <GameCard data={highlights[2]} useThirdThumbnail={true} />
            )}
          </div>
        </div>
      </div>
      {isLoading && <LoadingScreen />}
    </main>
  );
}
