"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { Menu as MenuIcon } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";

import SearchInput from "./SearchInput";

export default function Navbar() {
    const router = useRouter();

    const [isDesktop, setIsDesktop] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth <= 1400);
        };
        
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const categories = [
        { id: 1, icon: <Image src="/images/Steam.svg" alt="Steam" width={15} height={15} />, text: 'Steam', link: '/steam' },
        { id: 2, icon: <Image src="/images/Kinguin.svg" alt="Kinguin" width={15} height={15} />, text: 'Kinguin', link: '/kinguin' },
        { id: 3, icon: <Image src="/images/Epic.svg" alt="Epic Games" width={15} height={15} />, text: 'Epic Games', link: '/epicgames' },
        { id: 4, icon: <Image src="/images/Novidades.svg" alt="Novidades" width={15} height={15} />, text: 'Novidades', link: '/novidades' },
    ];

    const open = Boolean(anchorEl);

    return (
        <header className='bg-[#111111] text-white sm:h-[100px] h-[200px] flex items-center fixed top-0 left-0 right-0 z-50'>
            <nav className='max-w-[1064px] m-auto w-[100%]'>
                <div className='flex sm:justify-between justify-center flex-col sm:flex-row items-center gap-y-10 sm:gap-y-0'>
                    <div className='gap-x-[1.3125em] flex items-center'>

                        <div onClick={() => router.push('/')} className="flex gap-x-2 items-center">

                            <Image src="/images/GameSavings.svg" 
                                alt="GameSavings" width={65} height={65} className="cursor-pointer hover:brightness-75" 
                            />

                            <div className='text-[14px] uppercase flex items-center gap-x-[0.02rem] font-bold cursor-pointer hover:brightness-75'>
                                game<span className="text-[#F28500]"> savings</span>
                            </div>

                        </div>

                        {isDesktop ? (
                            <>
                                <div className='hover:bg-[#2d2d2d] transition ease-in-out delay-100 rounded-md -ml-3'>

                                    <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} 
                                        aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}
                                    >
                                        <MenuIcon className='text-white' />
                                    </Button>

                                </div>

                                <Menu id="basic-menu" anchorEl={anchorEl} open={open} 
                                    onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button'}}
                                >

                                    <div className='bg-[#2d2d2d] text-white py-6 px-4'>
                                        {categories.map((category) => (
                                        <Link key={category.id} href={category.link}>
                                            <MenuItem className='flex items-center gap-x-2 w-full' onClick={handleClose}>
                                                {category.icon}
                                                {category.text}
                                            </MenuItem>
                                        </Link>
                                        ))}
                                    </div>
                                    
                                </Menu>
                            </>
                        ) : (
                            <div className="flex gap-x-[1.3125em]">
                                {categories.map((category) => (
                                <div key={category.id}>
                                    <Link href={category.link} className="flex items-center justify-center gap-x-1 filter-gray text-[14px]">
                                        {category.icon}
                                        {category.text}
                                    </Link>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='flex items-center gap-x-4'>
                        <div className="flex">
                            <div className='text-[10px] flex items-center gap-x-1'>
                                <span>BRL</span>
                                <Image width={26} height={26} src="/images/Brasil.svg" alt="Bandeira do Brasil" />
                            </div>
                        </div>
                        <div>
                            <SearchInput />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}