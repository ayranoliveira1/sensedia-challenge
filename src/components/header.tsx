import Image from 'next/image'
import { CircleHelpIcon } from 'lucide-react'
import { IoAppsSharp } from 'react-icons/io5'

const user = {
  name: 'Ayran Oliveira',
}

const Header = () => {
  return (
    <header>
      <section className="bg-[#3D3D3D] h-[87px] w-full text-white flex items-center px-8">
        <Image src="/logo.png" alt="Company Logo" width={130} height={130} />
      </section>

      <nav className="flex items-center justify-between px-8 h-[66px] border-b border-gray-300">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-sensedia.png"
            alt="Company Logo"
            width={28}
            height={28}
          />

          <h1 className="font-bold text-sm text-[#8556AA]">BEM-VINDO</h1>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-5">
            <CircleHelpIcon size={22} />
            <IoAppsSharp size={22} />
          </div>

          <div className="ml-10 mr-1 w-[3px] h-[40px] bg-gray-300"></div>

          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#8556AA] text-white font-bold">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>

            <p className="text-sm">{user.name}</p>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
