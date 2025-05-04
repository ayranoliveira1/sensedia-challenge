import { UserType } from '../user-table'

interface TableProps {
  paginatedUsers: Pick<
    UserType,
    'username' | 'name' | 'email' | 'city' | 'days' | 'posts' | 'albums'
  >[]
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
          <tr key={index} className="border-b hover:bg-gray-50">
            <td className="py-2 pr-4 font-bold text-gray-700">
              {user.username}
            </td>
            <td className="py-2 pr-4">{user.name}</td>
            <td className="py-2 pr-4">{user.email}</td>
            <td className="py-2 pl-[1px]">{user.city}</td>
            <td className="py-2 pr-4">{user.days}</td>
            <td className="py-2 pr-4 text-center">{user.posts}</td>
            <td className="py-2 text-center">{user.albums}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
