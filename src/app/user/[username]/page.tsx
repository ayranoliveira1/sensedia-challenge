import { getAlbumsByUserId } from '@/http/get-albums-by-user-id'
import { getPostsByUserId } from '@/http/get-posts-by-user-id'
import { getUsersMetaData } from '@/http/get-user-metadata'
import { getUserById } from '@/http/get-user-by-id'
import CardProfile from './components/card-profile'
import UserNotFound from './components/erros/user-not-found'

interface UserPageProps {
  params: Promise<{ username: string }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params

  const responseMetaData = await getUsersMetaData()

  const userMetaData = responseMetaData.users.find(
    (user) => user.username === username,
  )

  if (!userMetaData) {
    return (
      <UserNotFound
        errorTitle="Usuário não encontrado"
        errorDescription=" Ops! Parece que o perfil que você está procurando não existe ou foi removido."
        errorList={[
          'O nome de usuário foi digitado incorretamente.',
          'A conta foi desativada ou excluída',
          'O perfil pode estar temporariamente indisponível.',
          'O usuário pode ter configurado a privacidade do perfil.',
          'Houve um erro temporário no sistema.',
        ]}
      />
    )
  }

  const userData = await getUserById(userMetaData.user_id)
  const userPosts = await getPostsByUserId(userMetaData.user_id)
  const userAlbums = await getAlbumsByUserId(userMetaData.user_id)

  if (!userData || !userPosts || !userAlbums) {
    return (
      <UserNotFound
        errorTitle="Erro ao acessar os dados do usuário"
        errorDescription="Os dados do usuário não puderam ser recuperados."
        errorList={[
          'Verifique sua conexão com a internet.',
          'Tente recarregar a página.',
          'Se o problema persistir, entre em contato com o suporte.',
        ]}
      />
    )
  }

  const user = {
    id: userData.user.id,
    username: userMetaData.username,
    name: userData.user.name,
    email: userData.user.email,
    days: userMetaData.days,
    city: userMetaData.city,
    posts: !userPosts.posts ? 0 : userPosts.posts.length,
    albums: !userAlbums.albums ? 0 : userAlbums.albums.length,
    created_at: userData.user.created_at,
  }

  return (
    <CardProfile user={{ ...user, created_at: new Date(user.created_at) }} />
  )
}
