"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";

import KinguinHighLights from "@/components/highlights/KinguinHighlights";

import Image from "next/image";

import useSWR from "swr";

const fetchPosts = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Falha ao pesquisar, tente novamente mais tarde!")
    }

    return response.json();
}

const KinguinPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(300);

    const {data} = useSWR(`/api/kinguin`, fetchPosts);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
    
        return () => clearTimeout(loadingTimer);
    }, [data]);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
    
        return () => clearTimeout(loadingTimer);
    }, []);

    useEffect(() => {
        const sliderEl3 = document.getElementById('range3') as HTMLInputElement;
        const sliderValue3 = document.querySelector('.value3') as HTMLElement;
    
        const tempSliderValue = maxPrice;
        sliderValue3.textContent = tempSliderValue.toString();
    
        const progress = (tempSliderValue / parseInt(sliderEl3.max)) * 100;
    
        sliderEl3.style.background = `linear-gradient(to right, #F28500 ${progress}%, #FFFFFF ${progress}%)`;
    
        sliderEl3.style.setProperty('--thumb-rotate', `${(tempSliderValue / 100) * 2160}deg`);
    }, [maxPrice]);
    
    const handleMaxPriceChange = (e: any) => {
        const value = parseInt(e.target.value);
        setMaxPrice(value);
    };

    const filteredData = data
        ? data
              .filter((game: any) => game.price <= maxPrice)
              .sort((a: any, b: any) => b.price - a.price)
    : [];

    const LoadingScreen = () => {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="lds-heart"><div></div></div>
          </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen mt-[12rem] sm:mt-[7rem]">
            <Navbar />

            <div className="mt-[3.375rem]">
                <KinguinHighLights />
            </div>

            <main className="flex-grow marginTopResponsive lg:mt-[5.375rem]">
                <div className="relative max-w-[1064px] m-auto w-[100%]">

                    <div className='flex items-center mb-4 text-white justify-center'>
                        <div className='flex items-center gap-x-1 text-[20px] sm:text-[28px] font-semibold ml-12 sm:ml-8' >
                            <span className="mr-2">R$ 0</span>
                            <input type="range" min={0} max={300} value={maxPrice} className='range-input cursor-pointer outline-0 rounded-[15px] h-[4px] w-[150px] sm:w-[300px] md:w-[400px] lg:w-[649px]' id='range3' onChange={handleMaxPriceChange} />
                            
                            <div className="ml-2 flex">
                                <span>R$</span>
                                <input type='number' min={0} max={300} value={maxPrice === 0 ? '' : maxPrice} className='value3 w-[90px] text-center rounded-md border-none outline-none focus:outline-none' 
                                    onChange={(e) => {
                                        const value = e.target.value.trim();
                                        if (value === '' || isNaN(parseInt(value))) {
                                            setMaxPrice(0);
                                        } else {
                                            setMaxPrice(Math.min(300, Math.max(0, parseInt(value))));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center lg:justify-start lg:items-start">

                        <div className="flex items-center gap-x-2 mb-4 mt-[3.375rem]">
                            <div className="w-[45px] h-[45px] bg-[#F28500] rounded-full flex items-center justify-center">
                            <Image width={30} height={18.3} src="/images/Computador.svg" alt="Ícone de um computador" />
                            </div>
                            <p className="text-white uppercase text-[15px] sm:text-[24px] font-semibold">Jogos que são mais baratos no Kinguin</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-[6.5rem]">
                                {filteredData.map((game: any) => (
                                    <GameCard key={game.id} data={game} />
                                ))}
                            </div>
                        </div>

                    </div>

                    {isLoading && <LoadingScreen />}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default KinguinPage;