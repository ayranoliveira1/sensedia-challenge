import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog'
import { deleteUser } from '@/http/delete-user'

import { toast } from 'sonner'

interface DeleteUserModalProps {
  user_id: string
}

const DeleteUserModal = ({ user_id }: DeleteUserModalProps) => {
  const handleDeleteUser = async () => {
    try {
      await deleteUser(user_id)
      toast.success('Usuário excluído com sucesso')
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <AlertDialogContent className="px-5 w-[450px]">
      <AlertDialogTitle>Excluir usuário?</AlertDialogTitle>
      <AlertDialogDescription>
        Tem certeza que deseja excluir este usuário?
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={handleDeleteUser}
        >
          Excluir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteUserModal
