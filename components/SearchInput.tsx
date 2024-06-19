"use client";

import { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSearch = async (e: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();

        setIsLoading(true);

        if (searchQuery.trim() === "") {
            await router.push(`/`);
        } else {
            const encodedSearchQuery = encodeURI(searchQuery);
            await router.push(`/search?q=${encodedSearchQuery}`);
        }

        setIsLoading(false);
    };

    const handleIconClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            onSearch(e);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(e);
        }
    };

    return (
        <div className="relative flex items-center justify-center gap-1" onSubmit={onSearch}>

            <div>
                <input
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown}
                    type="text" id="searchplaceholder" placeholder="Pesquisar por título..."
                    className="p-2 w-[250px] h-[36px] rounded-lg placeholder-transparent bg-transparent outline-[1.9px] focus:outline-[#F28500] focus:outline-2 cursor-pointer"
                />

                <label htmlFor="searchplaceholder" className="absolute text-[13px] top-[-0.01rem] sm:left-0 text-[#A0A2A5] cursor-text labelminwidth">
                    Pesquisar por título...
                </label>
            </div>

            <div
                onClick={handleIconClick}
                className="flex cursor-pointer items-center justify-center w-10 h-10 hover:bg-[#1f1f1f] hover:duration-500 hover:rounded-full"
            >
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                    <Image width={26} height={26} src="/images/Pesquisar.svg" alt="Pesquisar" className="mt-1" />
                )}
            </div>
        </div>
    )
}

export default SearchInput;