import { IoIosSearch } from 'react-icons/io'

const skeletonArray = Array.from({ length: 8 })

export default function UserTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto mt-5">
      <div className="w-full border-b-[2px] lg:h-9 h-7 border-[#9E9E9E] bg-gray-100 py-2 pl-5 pr-3 text-sm flex items-center justify-between">
        <span className="text-gray-600 lg:text-base text-sm">Procurar</span>
        <IoIosSearch className="lg:size-6 size-4" />
      </div>

      <div className="min-w-[900px]overflow-hidden mt-10">
        <div className="grid grid-cols-7 border-t py-2 text-[8px] lg:text-sm  font-semibold text-gray-600">
          <span>User</span>
          <span>Nome</span>
          <span>E-mail</span>
          <span>Cidade</span>
          <span>Dias da Semana</span>
          <span>Posts</span>
          <span>Álbuns</span>
        </div>

        {skeletonArray.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 items-cente gap 2 py-3 border-t text-xs lg:text-sm animate-pulse"
          >
            <div className="lg:h-4 h-2 my-4 bg-gray-300 rounded w-10 lg:w-16" />
            <div className="lg:h-4 h-2 my-4 bg-gray-300 rounded w-10 lg:w-24" />
            <div className="lg:h-4 h-2 my-4  bg-gray-300 rounded w-10 lg:w-28" />
            <div className="lg:h-4 h-2 my-4  bg-gray-300 rounded w-10 lg:w-28" />
            <div className="lg:h-4 h-2 my-4 bg-gray-300 rounded w-10 lg:w-32" />
            <div className="lg:h-4 h-2 my-4 bg-gray-300 rounded w-10 lg:w-8 mx-auto" />
            <div className="lg:h-4 h-2 my-4 bg-gray-300 rounded w-10 lg:w-8 mx-auto" />
          </div>
        ))}

        <div className="flex items-center justify-between px-4 py-3 border-t gap-4">
          <div className="lg:h-4 h-2 w-24 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 lg:h-8 lg:w-20 w-10 bg-gray-200 rounded-full" />
            <div className="h-4 lg:h-8 lg:w-8 w-4 bg-gray-200 rounded-full" />
            <div>...</div>
            <div className="flex items-center">
              <div className="h-4 lg:h-8 lg:w-8 w-4 bg-gray-200 rounded-l-full" />
              <div className="h-4 lg:h-8 lg:w-8 w-4 bg-gray-200" />
              <div className="h-4 lg:h-8 lg:w-8 w-4 bg-gray-200 rounded-r-full" />
            </div>
            <div>...</div>
            <div className="h-4 lg:h-8 lg:w-8 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 lg:h-8 lg:w-20 w-10 bg-gray-200 rounded-full" />
          </div>
          <div className="lg:h-4 h-2 lg:w-20 w-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
