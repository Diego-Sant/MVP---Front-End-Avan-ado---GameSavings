import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const suportCategories = [
        { id: 1, text: 'Ajude-nos a melhorar', link: '' },
        { id: 2, text: 'Status de serviço', link: '' },
        { id: 3, text: 'Suporte', link: '' },
        { id: 4, text: 'Sobre nós', link: '' },
        { id: 5, text: 'Entrar em contato', link: '' },
    ];

    const judicialCategories = [
        { id: 1, text: 'EULA do site', link: '' },
        { id: 2, text: 'Política de privacidade', link: '' },
        { id: 3, text: 'Termos de serviço', link: '' },
    ];

    return (
        <footer className="flex flex-col text-white mt-[13.438rem] mb-[2rem]">
            <div className='bg-[#111111] h-[90px] flex items-center'>
                <div className='max-w-[1064px] m-auto w-[100%]'>
                    <div className='flex justify-center items-center'>

                        <div className="flex flex-wrap sm:flex-row justify-center gap-y-3 sm:gap-y-0 gap-x-[2rem] sm:gap-x-[4.813rem] uppercase">
                            {suportCategories.map((category) => (
                                <div key={category.id}>
                                    <Link href={category.link} className="text-[10px] sm:text-[14px] font-semibold hover:text-[#A0A2A5]">
                                        {category.text}
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-[1.25rem]">
                <Link href="/">
                    <Image src="/images/GameSavings.svg" 
                        alt="GameSavings" width={95} height={95} className="cursor-pointer hover:brightness-75" 
                    />
                </Link>
                <p className="text-[#5B5B5B] text-[10px] sm:text-[12px] mt-[1.875rem]">
                    ™ & © 2024 GameSavings. Todos os direitos reservados. 
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-y-3 sm:gap-y-0 gap-x-[4.813rem] uppercase mt-[2.188rem]">
                    {judicialCategories.map((category) => (
                        <div key={category.id}>
                            <Link href={category.link} className="text-[10px] sm:text-[14px] font-semibold hover:text-[#A0A2A5]">
                                {category.text}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}