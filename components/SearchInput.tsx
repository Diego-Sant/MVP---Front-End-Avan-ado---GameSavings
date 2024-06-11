import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs"

const SearchInput = () => {
    const [focused, setFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            setFocused(true);
        }
    }, [searchQuery]);

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`/pesquisar?q=${encodedSearchQuery}`)
    };

    const handleIconClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            onSearch(e);
        }
    };

    return (
        <form className="relative flex items-center justify-center gap-1" onSubmit={onSearch}>

            <div>
                <input
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    type="text" id="searchplaceholder" placeholder="Pesquisar por título..."
                    className="p-2 w-[250px] h-[36px] rounded-lg placeholder-transparent bg-transparent outline-[1.9px] focus:outline-[#8900ff] focus:outline-2 cursor-pointer"
                />

                <label
                    htmlFor="searchplaceholder"
                    className={`absolute left-2 transition-all duration-300 cursor-pointer text-[13px] top-[0.6rem] ${
                        focused || searchQuery ? "top-[-1.32rem] left-[0.205rem] text-[#A0A2A5] text-[11.5px] cursor-default" : "top-2 text-[#A0A2A5]"
                    }`}
                >
                    Pesquisar por título...
                </label>
            </div>

            <div
                onClick={handleIconClick}
                className="flex cursor-pointer items-center justify-center w-10 h-10 hover:bg-[#1f1f1f] hover:duration-500 hover:rounded-full"
            >
                <Image width={26} height={26} src="/images/Pesquisar.svg" alt="Pesquisar" className="mt-1" />
            </div>
        </form>
    )
}

export default SearchInput;