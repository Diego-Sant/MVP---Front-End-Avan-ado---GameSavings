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

const SearchPage = () => {
    const router = useRouter();

    const search = useSearchParams();
    const searchQuery = search ? search?.get('q') : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");

    const [isLoading, setIsLoading] = useState(true);
    const [showNoResults, setShowNoResults] = useState(false);

    const {data} = useSWR(`/api/pesquisar?q=${encodedSearchQuery}`, fetchPosts);

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
        <>
        </>
    )
}

export default SearchPage;