import { useEffect, useState } from "react";

import NewsGameCard from "@/components/NewsGameCard";
import LoadingScreen from "@/components/LoadingScreen";

interface Game {
  id: string;
}

export default function NewsHighLights() {
  const [newsHighlights, setNewsHighlights] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsHighlights = async () => {
      try {
        const response = await fetch('/api/newsHighlight');
        const data = await response.json();

        setNewsHighlights(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchNewsHighlights();
  }, []);

  return (
    <main className="relative max-w-[1064px] m-auto w-[100%] flex flex-col justify-center lg:justify-start items-center lg:items-start">
      
      <div className="text-white flex flex-col items-center gap-y-10 lg:gap-y-0 lg:items-stretch lg:flex-row w-[360px] sm:w-[1064px] h-[450px] gap-[10px]">

        <div className='flex flex-1 sm:flex-1 flex-col gap-[10px]'>
          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {newsHighlights[0] && (
              <NewsGameCard data={newsHighlights[0]} />
            )}
          </div>
        </div>

        <div className='flex flex-1 sm:flex-1 flex-col gap-[10px]'>
          <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
            {newsHighlights[1] && (
              <NewsGameCard data={newsHighlights[1]} />
            )}
          </div>
        </div>

      </div>
      {isLoading && <LoadingScreen />}
    </main>
  );
}
