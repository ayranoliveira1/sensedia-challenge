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
    <table className="w-full text-sm text-left border-t border-b border-gray-200">
      <thead className="uppercase text-gray-500 font-semibold text-xs border-b">
        <tr>
          <th className="py-2 pr-4">User</th>
          <th className="py-2 pr-4">Nome</th>
          <th className="py-2 pr-4">E-mail</th>
          <th className="py-2 pr-20">Cidade</th>
          <th className="py-2 pr-4 w-[150px]">Dias da Semana</th>
          <th className="py-2 pr-4 text-center">Posts</th>
          <th className="py-2  text-center">Álbuns</th>
        </tr>
      </thead>
      <tbody>
        {paginatedUsers.map((user, index) => (
          <tr
            key={index}
            className="border-b hover:bg-gray-50 group transition-colors duration-300"
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
            <td className="h-18 text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={() => {}}
                    className="hidden group-hover:inline-flex items-center cursor-pointer justify-center text-red-500 hover:text-red-700 transition-colors"
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
