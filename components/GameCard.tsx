import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface GameCardProps {
    data: Record<string, any>;
    useSecondThumbnail?: boolean;
    useThirdThumbnail?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ data, useSecondThumbnail = false, useThirdThumbnail = false }) => {
    const [titleWidth, setTitleWidth] = useState<number>(0);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            setTitleWidth(titleRef.current.offsetWidth);
        }
    }, [data.name]);

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

    const containerWidth = useSecondThumbnail || useThirdThumbnail ? 450 : 285;

    const lowerBarWidth = useSecondThumbnail || useThirdThumbnail ? 530 : 285;
    const lowerBarHeight = useSecondThumbnail ? 90 : useThirdThumbnail ? 75 : 77;

    const titleFontSize = data.name.length <= 15 ? "30px" : "22px";
    const truncatedName = useThirdThumbnail ? data.name.length > 40 ? data.name.substring(0, 40) + "..." : data.name : data.name.length > 19 ? data.name.substring(0, 19) + "..." : data.name

    return (
        <div className={`flex flex-col w-[${containerWidth}px] rounded-md overflow-hidden`}>
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

                <div className="bg-[#F28500] absolute z-[15] h-[59px] ml-2 px-1 rounded-md" 
                    style={useSecondThumbnail ? {transform: `translateY(-${73}px)` } 
                    : useThirdThumbnail && data.name.length > 15 ? {transform: `translateY(-${110}px)` } : useThirdThumbnail ? {transform: `translateY(-${115}px)` } : {transform: `translateY(-${121}px)` }} ref={titleRef}
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

                        <div className="flex -mt-[0.650rem]" style={useSecondThumbnail || useThirdThumbnail ? {marginRight: 8, columnGap: 15} : {marginRight: 1, columnGap: 6}}>
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