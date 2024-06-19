"use client";

import React, { useState, useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

interface NewsGameCardProps {
    data: Record<string, any>;
}

const NewsGameCard: React.FC<NewsGameCardProps> = ({ data }) => {
    const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    const [titleWidth, setTitleWidth] = useState<number>(0);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            setTitleWidth(titleRef.current.offsetWidth);
        }
    }, [data.name]);

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getStyles = () => {
        if (screenWidth < 400) {
            return { marginRight: 153, columnGap: 10 }
        } else if (screenWidth > 400 && screenWidth < 640) {
            return { marginRight: 133, columnGap: 10 };
        } else {
            return { marginRight: 1, columnGap: 15 }
        }
    };

    const getWidthAndHeightStyles = () => {
        if (screenWidth < 400) {
            return { width: 380, height: 340 }
        } else if (screenWidth < 640 && screenWidth > 400) {
           return { width: 400, height: 340 }
        } else {
            return { width: 530, height: 405 }
        };
    };

    const getPlatformImage = (platform: string) => {
        switch (platform) {
            case "Steam":
                return "/images/Steam.svg";
            case "Epic":
                return "/images/Epic.svg";
            case "Kinguin":
                return "/images/Kinguin.svg";
            case "Green Man Gaming":
                return "/images/GreenManGaming.svg";
            case "G2A":
                return "/images/G2A.svg";
            case "Eneba":
                return "/images/Eneba.svg";
            case "Nuuvem":
                return "/images/Nuuvem.svg";
            default:
                return null;
        }
    };

    const getPlatformStyle = (platform: string) => {
        switch (platform) {
            case "Steam":
                return { width: 26.67, height: 26.67 };
            case "Epic":
                return { width: 22.41, height: 26 };
            case "Kinguin":
                return { width: 25, height: 30.6 };
            case "Green Man Gaming":
                return { width: 25, height: 25.08 };
            case "G2A":
                return { width: 30, height: 8.55 };
            case "Eneba":
                return { width: 30, height: 29.71 };
            case "Nuuvem":
                return { width: 30, height: 20.03 };
            default:
                return { width: 0, height: 0 };
        }
    };

    const platformImage = getPlatformImage(data.cheapestSeller);
    const platformStyle = getPlatformStyle(data.cheapestSeller);

    const imageWidth = 530;
    const imageHeight = 366;

    const lowerBarWidth = 530;
    const lowerBarHeight = 77;

    const titleFontSize = data.name.length <= 15 && screenWidth < 640 ? "26px" :
        data.name.length <= 15 && screenWidth > 640 ? "35px" :
        data.name.length >= 15 && screenWidth > 640 ? "28px" :
        data.name.length >= 15 && screenWidth < 640 ? "20px" :
        screenWidth < 640 ? "15px" : "22px";


    const getTruncatedName = () => {
        return data.name.length > 20 ? data.name.substring(0, 20) + "..." : data.name;
    };

    const truncatedName = getTruncatedName();

    return (
        <div className="flex flex-col rounded-md overflow-hidden" style={getWidthAndHeightStyles()}>
            <div className='w-full h-full relative'>

                {data.isNew &&
                    <span className='absolute flex items-center top-[9px] left-[9px] bg-[#F28500] text-white text-[15px] rounded-md font-semibold px-1 py-1 z-30'>
                        <Image width={16} height={16} src="/images/Novidade.svg" alt="Novidade" className='mr-1' />
                        Novidade
                    </span>
                }

                <Image width={imageWidth} height={imageHeight} 
                    className='rounded-md object-cover z-10' 
                    src={data.secondThumbnailUrl}
                    alt="Artwork do jogo" 
                />

                <div className="bg-[#F28500] absolute z-[15] h-[59px] ml-2 px-1 rounded-md" ref={titleRef}
                    style={data.name.length > 15 && screenWidth < 400 ? {transform: `translateY(-${40}px)` }
                    : data.name.length < 15 && screenWidth < 400 ? {transform: `translateY(-${65}px)` }
                        
                    : data.name.length > 15 && screenWidth < 640 ? {transform: `translateY(-${50}px)` }
                    : data.name.length > 15 && screenWidth > 640 ? {transform: `translateY(-${68}px)` }

                    : {transform: `translateY(-${75}px)` }} 
                >

                    <p className="uppercase text-white font-semibold mt-1" style={{ fontSize: titleFontSize }}>
                        {truncatedName}
                    </p>

                </div>

                <div className="bg-[#292929] absolute bottom-0 z-20" style={{ width: `${lowerBarWidth}px`, height: `${lowerBarHeight}px` }}>

                    <div className="flex items-center mt-[0.75rem] gap-2" style={{marginLeft: 12}}>
                        {data?.olderPrice ? <p className='text-[#797A7C] line-through font-semibold' style={{fontSize: 13}}>R${(data?.olderPrice).toFixed(2).replace(".", ",")}</p> : null}
                        {data?.percentageLess ? <p className='text-white bg-[#14FF00]/50 rounded-md p-[0.19rem] h-[22px] text-[11px] font-semibold -mt-[0.19rem]'>-{(data?.percentageLess)}%</p> : null}
                    </div>

                    <div className="flex items-center justify-between mr-[0.2rem]">

                        {data?.olderPrice && data?.percentageLess ? (
                            <h1 className='text-[#F28500] -mt-[0.250rem] font-semibold tracking-[-0.81px]' style={{fontSize: 36, marginLeft: 17}}>
                                R$ {(data?.price).toFixed(2).replace(".", ",")}
                            </h1>
                        ) : (
                            <h1 className='text-[#F28500] -mt-[0.250rem] font-semibold tracking-[-0.81px]' style={{fontSize: 40, marginLeft: 17, marginTop: 7}}>
                                R$ {(data?.price).toFixed(2).replace(".", ",")}
                            </h1>
                        )}

                        {data?.olderPrice && data?.percentageLess ? (
                            <div className="flex -mt-[0.650rem]" style={getStyles()}>
                                {data?.isGamePass && data?.gamePassLink && (
                                    <div className="bg-[#F28500] rounded-md p-1 w-[60px] h-[40px] flex items-center justify-center cursor-pointer transition hover:bg-[#C26A00]">
                                        <Link href={data?.gamePassLink} target="_blank">
                                            <Image width={54} height={26.31} src="/images/GamePass.svg" alt="GamePass" />
                                        </Link>
                                    </div>
                                )}
                        
                                {platformImage && data?.sellerLink && (
                                    <div className="bg-[#F28500] rounded-full p-1 flex items-center justify-center cursor-pointer transition hover:bg-[#C26A00] w-[40px] h-[40px]">
                                        <Link href={data.sellerLink} target="_blank">
                                            <Image width={platformStyle.width} height={platformStyle.height} src={platformImage} alt={data.cheapestSeller} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex mt-[0.2rem]" style={getStyles()}>
                                {data?.isGamePass && data?.gamePassLink && (
                                    <div className="bg-[#F28500] rounded-md p-1 w-[60px] h-[40px] flex items-center justify-center cursor-pointer transition hover:bg-[#C26A00]">
                                        <Link href={data?.gamePassLink} target="_blank">
                                            <Image width={54} height={26.31} src="/images/GamePass.svg" alt="GamePass" />
                                        </Link>
                                    </div>
                                )}
                        
                                {platformImage && data?.sellerLink && (
                                    <div className="bg-[#F28500] rounded-full p-1 flex items-center justify-center cursor-pointer transition hover:bg-[#C26A00] w-[40px] h-[40px]">
                                        <Link href={data.sellerLink} target="_blank">
                                            <Image width={platformStyle.width} height={platformStyle.height} src={platformImage} alt={data.cheapestSeller} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
            
            {data?.description && (
                <p className="text-[#A0A2A5] text-[13px]">{data?.description}</p>
            )}

        </div>
    );
}

export default NewsGameCard;