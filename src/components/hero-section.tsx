import { FaDribbble, FaAlignLeft, FaTrophy } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <section className="bg-[#8556AA] lg:h-[100px] h-20">
      <div className="max-w-[1300px] mx-auto text-white h-full flex items-center lg:gap-12 gap-4 px-3 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="bg-white px-1 py-[6px] rounded-sm">
            <FaDribbble className="text-[#8556AA] lg:size-9 size-5" />
          </span>

          <div className="flex flex-col gap-2">
            <p className="lg:text-sm text-[9px] font-semibold">
              Tipo de Quadra
            </p>
            <p className="lg:text-sm text-xs font-extralight">Society</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white">
            <FaAlignLeft className="lg:size-11 size-7" />
          </span>

          <div className="flex flex-col gap-2">
            <p className="lg:text-sm text-[9px] font-semibold">Nível</p>
            <p className="lg:text-sm text-[9px] font-extralight">
              Semi-Profissional
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white">
            <FaTrophy className="lg:size-11 size-7" />
          </span>

          <div className="flex flex-col gap-2">
            <p className="lg:text-sm text-[9px] font-semibold">Vitórias</p>
            <p className="lg:text-sm text-[9px] font-extralight">345</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
