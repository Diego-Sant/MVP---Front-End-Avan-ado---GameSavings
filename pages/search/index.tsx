import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";

import {useSearchParams} from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useSWR from "swr";

const fetchPosts = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Falha ao pesquisar, tente novamente mais tarde!")
    }

    return response.json();
}

interface Game {
    name: string;
}

const SearchPage = () => {
    const [shuffledGames, setShuffledGames] = useState<Game[]>([]);
    const router = useRouter();

    const search = useSearchParams();
    const searchQuery = search ? search?.get('q') : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");

    const [isLoading, setIsLoading] = useState(true);
    const [showNoResults, setShowNoResults] = useState(false);

    const {data} = useSWR(`/api/search?q=${encodedSearchQuery}`, fetchPosts);

    useEffect(() => {
        if (data && data.length > 0) {
            const shuffled = shuffle(data);
            setShuffledGames(shuffled);
        }
    }, [data]);

    const shuffle = (array: Game[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
    
        return () => clearTimeout(loadingTimer);
    }, [data]);

    useEffect(() => {
        if (!searchQuery) {
          router.push("/");
        }
    }, [searchQuery, router]);

    useEffect(() => {
        let noResultsTimer: NodeJS.Timeout;
    
        if (data) {
          noResultsTimer = setTimeout(() => {
            setShowNoResults(true);
          }, 2000);
        }
    
        return () => clearTimeout(noResultsTimer);
    }, [data]);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
    
        return () => clearTimeout(loadingTimer);
    }, []);

    const LoadingScreen = () => {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="lds-heart"><div></div></div>
          </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">
                <div className="relative max-w-[1064px] m-auto w-[100%]">
                    <p className="mt-[3.5rem] mb-[2.5rem] text-[18px] text-white font-semibold ml-6 sm:ml-0 max-w-[90vw] break-words">Resultado da pesquisa: 
                        <span className="text-[#F28500]"> {searchQuery}</span>
                    </p>
                    <div className="flex justify-center">
                        
                        {shuffledGames && shuffledGames.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-[6.5rem]">
                                {shuffledGames.map((game: any) => (
                                    <GameCard key={game.id} data={game} />
                                ))}
                            </div>
                            ) : (
                                !isLoading && showNoResults && (
                                    <div className="text-white font-bold flex justify-center text-center text-[18px] w-screen sm:ml-0">
                                        <p>Não há nenhum jogo com esse título em nosso catálogo!</p>
                                    </div>
                                )
                            )
                        }
                        
                    </div>
                    {isLoading && <LoadingScreen />}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SearchPage;