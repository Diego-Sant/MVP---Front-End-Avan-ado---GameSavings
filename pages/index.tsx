import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import HighLights from "@/components/Highlights";
import LowerPrices from "@/components/LowerPrices";
import BiggerDiscounts from "@/components/BiggerDiscounts";
import MorePopular from "@/components/MorePopular";

export default function Home() {

  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">

      <div className="flex items-center justify-center mt-[3.438rem]">
        <div className="text-center max-w-md md:max-w-none">
          <p className="uppercase text-[16px] sm:text-[18px] text-white font-bold">
            Descubra onde encontrar o
            <span className="text-[#F28500]"> menor preço </span>
            para seus
            <span className="text-[#F28500]"> jogos favoritos</span>
          </p>
        </div>
      </div>

        <div className="mt-[3.375rem]">
          <HighLights />
        </div>

        <div className="marginTopResponsive lg:mt-[5.375rem]">
          <LowerPrices />
        </div>

        <div className="mt-[3.375rem] lg:mt-[5.375rem]">
          <BiggerDiscounts />
        </div>

        <div className="mt-[3.375rem] lg:mt-[5.375rem]">
          <MorePopular />
        </div>

      </main>
      
      <Footer />
    </div>
  )
}