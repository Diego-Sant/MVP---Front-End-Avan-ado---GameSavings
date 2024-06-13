import { useCallback, useEffect, useRef, useState } from "react";
import GameCard from "@/components/GameCard"; // Importando o componente GameCard
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";

interface Game {
  id: string;
  price: number;
}

export default function LowerPrices() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        const data: Game[] = await response.json();

        const sortedGames = data.sort((a, b) => a.price - b.price);

        setGames(sortedGames);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar destaques:", error);
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
      
      <div className="flex items-center gap-x-2 mb-2">
        <div className="w-[45px] h-[45px] bg-[#F28500] rounded-full flex items-center justify-center">
          <Image width={25} height={23} src="/images/MenorPreco.svg" alt="Ícone de fogo" />
        </div>
        <p className="text-white uppercase text-[24px] font-semibold">Menores preços</p>
      </div>

    <Swiper className="w-[100%]" spaceBetween={16} slidesPerView={3.5} pagination={{clickable: true}}
        navigation={{prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current}}
        onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
            }
        }} modules={[Navigation]}
    >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div className='flex flex-1 gap-[10px] relative overflow-hidden'>
              <GameCard data={game} />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>

        <div ref={navigationPrevRef} className="swiper-button-prev bg-[#F28500] rounded-full p-[24px]"></div>
        <div ref={navigationNextRef} className="swiper-button-next bg-[#F28500] rounded-full p-[24px]"></div>
      {isLoading && <LoadingScreen />}
      
    </main>
  );
}