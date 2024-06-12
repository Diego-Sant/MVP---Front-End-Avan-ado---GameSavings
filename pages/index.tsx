import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HighLights from "@/components/Highlights";

export default function Home() {

  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">

        <div className="flex items-center justify-center mt-[3.438rem]">
          <p className="uppercase text-[18px] text-white font-bold">
            Descubra onde encontrar o
            <span className="ml-1 text-[#F28500] mr-1">menor preço</span>
            para seus
            <span className="ml-1 text-[#F28500]">jogos favoritos</span>
          </p>
        </div>

        <div className="mt-[3.375rem]">
          <HighLights />
        </div>

      </main>
      
      <Footer />
    </div>
  )
}