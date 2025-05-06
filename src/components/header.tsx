import Image from 'next/image'
import { CircleHelpIcon } from 'lucide-react'
import { IoAppsSharp } from 'react-icons/io5'
import Link from 'next/link'
import UserDropDown from './user-dropdown'
import { getUserProfile } from '@/http/get-user-profile'
import Breadcrumb from './breadcrumb'

const Header = async () => {
  const userProfile = await getUserProfile()

  return (
    <header className="sticky top-0 z-50">
      <section className="bg-[#3D3D3D] lg:h-[87px] h-16 w-full text-white flex items-center px-3 lg:px-8">
        <Link href="/">
          <Image
            className="hidden lg:block"
            src="/logo.png"
            alt="Company Logo"
            width={130}
            height={130}
          />

          <Image
            className="lg:hidden"
            src="/logo.png"
            alt="Company Logo"
            width={90}
            height={60}
          />
        </Link>
      </section>

      <nav className="flex items-center justify-between lg:px-8 px-3 h-[66px] border-b bg-white border-gray-300">
        <div className="flex items-center gap-2">
          <Image
            className="lg:block hidden"
            src="/logo-sensedia.png"
            alt="Company Logo"
            width={28}
            height={28}
          />

          <Image
            className="lg:hidden"
            src="/logo-sensedia.png"
            alt="Company Logo"
            width={16}
            height={16}
          />

          <h1 className="font-bold text-xs lg:text-sm text-[#8556AA]">
            BEM-VINDO
          </h1>

          <Breadcrumb />
        </div>

        <div className="flex items-center gap-1">
          <div className="lg:flex hidden items-center gap-5">
            <CircleHelpIcon size={22} />
            <IoAppsSharp size={22} />
          </div>

          <div className="ml-10 mr-1 w-[3px] h-[40px] bg-gray-300 hidden lg:block"></div>

          <UserDropDown options={userProfile.menu}>
            <div className="flex items-center gap-1 lg:gap-4">
              <span className="flex items-center justify-center text-xs lg:text-base lg:w-10 w-7 lg:h-10 min-h-7 rounded-full bg-[#8556AA] text-white font-bold">
                {userProfile.name
                  .trim()
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((n) => n[0].toUpperCase())
                  .join('')}
              </span>

              <p className="lg:text-sm text-xs">{userProfile.name}</p>
            </div>
          </UserDropDown>
        </div>
      </nav>
    </header>
  )
}

export default Header
