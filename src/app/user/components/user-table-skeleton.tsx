const skeletonArray = Array.from({ length: 8 })

export default function UserTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto mt-2">
      <div className="min-w-[900px]overflow-hidden">
        {/* Cabeçalho da tabela */}
        <div className="grid grid-cols-7 border-t py-2 text-sm font-semibold text-gray-600">
          <span>User</span>
          <span>Nome</span>
          <span>E-mail</span>
          <span>Cidade</span>
          <span>Dias da Semana</span>
          <span>Posts</span>
          <span>Álbuns</span>
        </div>

        {/* Linhas esqueleto */}
        {skeletonArray.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 items-cente gap 2 py-3 border-t text-sm animate-pulse"
          >
            <div className="h-4 my-4 bg-gray-300 rounded w-16" />
            <div className="h-4 my-4 bg-gray-300 rounded w-24" />
            <div className="h-4 my-4 bg-gray-300 rounded w-full" />
            <div className="h-4 my-4 bg-gray-300 rounded w-28" />
            <div className="h-4 my-4 bg-gray-300 rounded w-32" />
            <div className="h-4 my-4 bg-gray-300 rounded w-8 mx-auto" />
            <div className="h-4 my-4 bg-gray-300 rounded w-8 mx-auto" />
          </div>
        ))}

        {/* Rodapé com paginação falsa */}
        <div className="flex items-center justify-between px-4 py-3 border-t gap-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded-full" />
            ))}
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
