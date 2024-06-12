import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface GameCardProps {
    data: Record<string, any>;
    useSecondThumbnail?: boolean;
    useThirdThumbnail?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ data, useSecondThumbnail = false, useThirdThumbnail = false }) => {
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
            return useSecondThumbnail || useThirdThumbnail
              ? { marginRight: 155, columnGap: 10 }
              : {};
        } else if (screenWidth > 400 && screenWidth < 640) {
          return useSecondThumbnail || useThirdThumbnail
            ? { marginRight: 105, columnGap: 10 }
            : {};
        } else {
          return useSecondThumbnail || useThirdThumbnail
            ? { marginRight: 8, columnGap: 15 }
            : { marginRight: 1, columnGap: 6 };
        }
    };

    const getWidthAndHeightStyles = () => {
        if (screenWidth < 400) {
            if (useSecondThumbnail) {
                return { width: 380, height: 350 };
            } else if (useThirdThumbnail) {
                return { width: 380, height: 200 };
            } else {
                return { width: 285, height: 390 };
            }
        } else if (screenWidth < 640 && screenWidth > 360) {
            if (useSecondThumbnail) {
                return { width: 430, height: 350 };
            } else if (useThirdThumbnail) {
                return { width: 430, height: 200 };
            } else {
                return { width: 285, height: 390 };
            }
        } else {
            if (useSecondThumbnail) {
                return { width: 530, height: 450 };
            } else if (useThirdThumbnail) {
                return { width: 530, height: 220 };
            } else {
                return { width: 285, height: 390 };
            }
        }
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

    const imageWidth = useSecondThumbnail || useThirdThumbnail ? 530 : 285;
    const imageHeight = useSecondThumbnail || useThirdThumbnail ? 300 : 366;

    const lowerBarWidth = useSecondThumbnail || useThirdThumbnail ? 530 : 285;
    const lowerBarHeight = useSecondThumbnail ? 90 : useThirdThumbnail ? 75 : 77;

    const titleFontSize = data.name.length <= 15 && screenWidth < 640 && useSecondThumbnail ? "26px" :
        data.name.length <= 15 && screenWidth < 640 ? "22px" :
        data.name.length <= 15 ? "30px" :
        screenWidth < 640 ? "15px" : "22px";


    const getTruncatedName = () => {
        if (useThirdThumbnail && screenWidth < 400) {
            return data.name.length > 27 ? data.name.substring(0, 27) + "..." : data.name;
        }else if (useThirdThumbnail && screenWidth < 640) {
            return data.name.length > 45 ? data.name.substring(0, 45) + "..." : data.name;
        } else if (useThirdThumbnail) {
            return data.name.length > 40 ? data.name.substring(0, 40) + "..." : data.name;
        } else {
            return data.name.length > 19 ? data.name.substring(0, 19) + "..." : data.name;
        }
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
                    src={useSecondThumbnail || useThirdThumbnail ? data.secondThumbnailUrl : data.thumbnailUrl}
                    alt="Artwork do jogo" 
                />

                <div className="bg-[#F28500] absolute z-[15] h-[59px] ml-2 px-1 rounded-md" ref={titleRef}
                    style={useSecondThumbnail && screenWidth < 400 ? {transform: `translateY(-${65}px)` }
                    : useSecondThumbnail && screenWidth > 640 ? {transform: `translateY(-${73}px)` } 
                    : useSecondThumbnail && screenWidth < 640 ? {transform: `translateY(-${95}px)` }

                    : useThirdThumbnail && screenWidth < 400 && data.name.length > 15 ? {transform: `translateY(-${70}px)` }
                    : useThirdThumbnail && screenWidth < 400 ? {transform: `translateY(-${75}px)` }

                    : useThirdThumbnail && screenWidth < 640 && data.name.length > 15 ? {transform: `translateY(-${85}px)` }
                    : useThirdThumbnail && screenWidth < 640 ? {transform: `translateY(-${88}px)` } 

                    : useThirdThumbnail && screenWidth > 640 && data.name.length > 15 ? {transform: `translateY(-${110}px)` }
                    : useThirdThumbnail && screenWidth > 640 ? {transform: `translateY(-${120}px)` }

                    : {transform: `translateY(-${121}px)` }} 
                >

                    <p className="uppercase text-white font-semibold mt-1" style={{ fontSize: titleFontSize }}>
                        {truncatedName}
                    </p>

                </div>

                <div className="bg-[#292929] absolute bottom-0 z-20" style={{ width: `${lowerBarWidth}px`, height: `${lowerBarHeight}px` }}>

                    <div className="flex items-center mt-[0.75rem] gap-2" style={useSecondThumbnail || useThirdThumbnail ? {marginLeft: 12} : {marginLeft: 6}}>
                        {data?.olderPrice ? <p className='text-[#797A7C] line-through font-semibold' style={useSecondThumbnail ? {fontSize: 14} : useThirdThumbnail ? {fontSize: 13} : {fontSize: 12}}>R${(data?.olderPrice).toFixed(2).replace(".", ",")}</p> : null}
                        {data?.percentageLess ? <p className='text-white bg-[#14FF00]/50 rounded-md p-[0.19rem] h-[22px] text-[11px] font-semibold -mt-[0.19rem]'>-{(data?.percentageLess)}%</p> : null}
                    </div>

                    <div className="flex items-center justify-between mr-[0.2rem]">

                        <h1 className='text-[#F28500] -mt-[0.250rem] font-semibold tracking-[-0.81px]' style={useSecondThumbnail ? {fontSize: 48, marginLeft: 40} : useThirdThumbnail ? {fontSize: 34, marginLeft: 45} : {fontSize: 36, marginLeft: 17}}>
                            R$ {(data?.price).toFixed(2).replace(".", ",")}
                        </h1>

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

                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameCard;