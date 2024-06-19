"use client";

import { useEffect, useRef, useState } from "react";

import GameCard from "@/components/GameCard";

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

        const limitedGames = sortedGames.slice(0, 10);

        setGames(limitedGames);
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
          <Image width={25} height={23} src="/images/MenorPreco.svg" alt="Ícone de fogo" />
        </div>
        <p className="text-white uppercase text-[24px] font-semibold">Menores preços</p>
      </div>

      <Swiper className="w-[100%]" spaceBetween={16} slidesPerView={3.5} pagination={{clickable: true}}
        navigation={{prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current}}
        modules={[Navigation]}

        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
          }
        }}

        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 4,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 16,
          },
        }}
    >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div className='flex flex-1 gap-[10px] relative overflow-hidden justify-center items-center'>
              <GameCard data={game} />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>

    <div ref={navigationPrevRef} className="swiper-button-prev xl:transform xl:translate-x-[-65%] bg-[#F28500] hover:bg-[#C26A00] rounded-full p-[24px]"></div>
    <div ref={navigationNextRef} className="swiper-button-next xl:transform xl:translate-x-[65%] custom-navigation-next bg-[#F28500] hover:bg-[#C26A00] rounded-full p-[24px]"></div>
    {isLoading && <LoadingScreen />}
      
    </main>
  );
}
