import { FaDribbble, FaAlignLeft, FaTrophy } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <section className="bg-[#8556AA] h-[100px]">
      <div className="max-w-[1300px] mx-auto text-white h-full flex items-center gap-12 px-8">
        <div className="flex items-center gap-3">
          <span className="bg-white px-1 py-[6px] rounded-sm">
            <FaDribbble size={36} className="text-[#8556AA]" />
          </span>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Tipo de Quadra</p>
            <p className="text-sm font-extralight">Society</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white">
            <FaAlignLeft size={44} />
          </span>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Nível</p>
            <p className="text-sm font-extralight">Semi-Profissional</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white">
            <FaTrophy size={44} />
          </span>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Vitórias</p>
            <p className="text-sm font-extralight">345</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
