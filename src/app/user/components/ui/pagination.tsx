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
      <span className="lg:text-base text-xs">Total {filteredUsers.length}</span>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="hidden lg:block px-4 py-1 border border-[#9E9E9E] cursor-pointer rounded-full disabled:opacity-50"
          data-testid="prev-button"
        >
          Anterior
        </button>

        <button
          onClick={() => goToPage(1)}
          data-testid="first-page-button"
          className={`lg:w-8 w-5 lg:h-8 h-5 rounded-full border border-[#9E9E9E] cursor-pointer text-center ${
            page <= 2 && 'hidden'
          }`}
        >
          1
        </button>

        {page > 2 && <span className="w-4 text-center">...</span>}

        <div className="flex divide-x border lg:text-sm text-xs border-[#9E9E9E] rounded-full overflow-hidden">
          {Array.from({ length: 3 }, (_, i) => {
            const p =
              page === 1
                ? i + 1
                : page === totalPages
                  ? page - 2 + i
                  : page - 1 + i

            return (
              <button
                key={p}
                onClick={() => goToPage(p)}
                data-testid={`page-button-${p}`}
                className={`lg:w-8 w-5 lg:h-8 h-5 text-xs lg:text-sm text-center cursor-pointer ${
                  p === page
                    ? 'bg-[#9E9E9E] text-white font-bold'
                    : 'bg-white text-gray-700'
                }`}
              >
                {p}
              </button>
            )
          })}
        </div>

        {page < totalPages - 1 && <span className="w-4 text-center">...</span>}

        {totalPages > 1 && (
          <button
            onClick={() => goToPage(totalPages)}
            data-testid="last-page-button"
            className={`lg:w-8 w-5 lg:h-8 h-5 rounded-full border text-xs lg:text-sm border-[#9E9E9E] cursor-pointer text-center ${
              page >= 6 && 'hidden'
            }`}
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="hidden lg:block px-4 py-1 border border-[#9E9E9E] cursor-pointer rounded-full disabled:opacity-50"
          data-testid="next-button"
        >
          Próximo
        </button>
      </div>

      <div className="flex items-center lg:space-x-1">
        <span className="lg:text-base text-xs">Ir para a página</span>
        <select
          className="border-b border-[#9E9E9E] cursor-pointer lg:px-2 py-1 lg:text-sm text-xs"
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
