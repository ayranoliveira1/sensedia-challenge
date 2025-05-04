import { UserType } from '../user-table'

interface PaginationProps {
  page: number
  goToPage: (page: number) => void
  filteredUsers: UserType[]
  totalPages: number
}

const Pagination = ({
  page,
  goToPage,
  filteredUsers,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-4 text-sm text-gray-600 space-x-2">
      <span>Total {filteredUsers.length}</span>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-1 border rounded-full disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          onClick={() => goToPage(1)}
          className={`w-8 h-8 rounded-full border text-center ${
            page === 1 ? 'bg-gray-400 text-white font-bold' : ''
          }`}
        >
          1
        </button>

        <span className="text-gray-500 select-none">...</span>

        <div className="flex divide-x border rounded-full overflow-hidden">
          {Array.from({ length: 3 }, (_, i) => {
            let centerPage = page
            if (page <= 2) centerPage = 3
            else if (page >= totalPages - 1) centerPage = totalPages - 2

            const p = centerPage - 1 + i

            return (
              p > 1 &&
              p < totalPages && (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-8 h-8 text-sm text-center ${
                    p === page
                      ? 'bg-gray-400 text-white font-bold'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {p}
                </button>
              )
            )
          })}
        </div>

        <span className="text-gray-500 select-none">...</span>

        {totalPages > 1 && (
          <button
            onClick={() => goToPage(totalPages)}
            className={`w-8 h-8 rounded-full border text-center ${
              page === totalPages ? 'bg-gray-400 text-white font-bold' : ''
            }`}
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-1 border rounded-full disabled:opacity-50"
        >
          Próximo
        </button>
      </div>

      <div className="flex items-center space-x-1">
        <span>Ir para a página</span>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={page}
          onChange={(e) => goToPage(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Pagination
