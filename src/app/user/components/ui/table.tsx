import { UserType } from '../user-table'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogTrigger,
} from '../../../../components/ui/alert-dialog'
import DeleteUserModal from '../delete-user-modal'

interface TableProps {
  paginatedUsers: UserType[]
}

const Table = ({ paginatedUsers }: TableProps) => {
  return (
    <table className="w-full text-sm text-left border-t border-b border-gray-200 overflow-hidden">
      <thead className="uppercase text-gray-500 font-semibold text-xs border-b">
        <tr>
          <th className="py-2 pr-4">User</th>
          <th className="py-2 pr-4">Nome</th>
          <th className="py-2 pr-4">E-mail</th>
          <th className="py-2 pr-20">Cidade</th>
          <th className="py-2 pr-4 w-[150px]">Dias da Semana</th>
          <th className="py-2 pr-4 text-center">Posts</th>
          <th className="py-2 text-center">Álbuns</th>
          <th className="py-2 pl-4 text-center lg:hidden">Ações</th>
        </tr>
      </thead>
      <tbody>
        {paginatedUsers.map((user, index) => (
          <tr
            key={index}
            className="border-b relative hover:bg-gray-50 group transition-colors duration-300"
          >
            <td className="py-2 pr-4 font-bold text-gray-700">
              {user.username}
            </td>
            <td className="h-18 pr-4">{user.name}</td>
            <td className="h-18 pr-4">{user.email}</td>
            <td className="h-18 pl-[1px]">{user.city}</td>
            <td className="h-18 pr-4">{user.days}</td>
            <td className="h-18 pr-4 text-center">{user.posts}</td>
            <td className="h-18 text-center">{user.albums}</td>
            <td className="h-18 text-center lg:absolute lg:right-0 lg:top-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={() => {}}
                    className="lg:hidden lg:group-hover:inline-flex items-center cursor-pointer justify-center text-red-500 hover:text-red-700 transition-colors"
                    title="Excluir usuário"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </AlertDialogTrigger>

                <DeleteUserModal user_id={user.id} />
              </AlertDialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
