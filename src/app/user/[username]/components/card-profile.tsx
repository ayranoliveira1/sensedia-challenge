import { UserType } from '@/components/user-table'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CardProfileProps {
  user: UserType
}

const CardProfile = ({ user }: CardProfileProps) => {
  return (
    <div className="bg-white p-4 md:p-8 h-full">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-purple-200 bg-white shadow-md">
        <div className="bg-[#8556AA] pb-0 pt-6">
          <div className="flex flex-col items-center justify-center pb-6">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white">
              <span className="flex items-center justify-center w-full h-full text-3xl rounded-full bg-[#7933ad] text-white font-bold">
                {user.name
                  .trim()
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#8556AA]">{user.name}</h1>
              <p className="text-gray-500">@{user.username}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-purple-50 p-4">
                <h2 className="mb-2 font-semibold text-[#8556AA]">
                  Localização
                </h2>
                <p className="text-gray-700">{user.city}</p>
              </div>

              <div className="rounded-lg bg-purple-50 p-4">
                <h2 className="mb-2 font-semibold text-[#8556AA]">
                  Membro desde
                </h2>
                <p className="text-gray-700">
                  {formatDistanceToNow(user.created_at, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-purple-50 p-4">
                <h2 className="mb-2 font-semibold text-[#8556AA]">Posts</h2>
                <p className="text-gray-700">{user.posts}</p>
              </div>

              <div className="rounded-lg bg-purple-50 p-4">
                <h2 className="mb-2 font-semibold text-[#8556AA]">Albuns</h2>
                <p className="text-gray-700">{user.albums}</p>
              </div>
            </div>

            <div className="rounded-lg bg-purple-50 p-4">
              <h2 className="mb-3 font-semibold text-[#8556AA]">
                Dias disponíveis
              </h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(user.days)
                  ? user.days.map((day) => (
                      <span
                        key={day}
                        className="inline-flex items-center rounded-full bg-purple-600 px-2.5 py-0.5 text-xs font-medium text-white hover:bg-[#8556AA]"
                      >
                        {day}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProfile
