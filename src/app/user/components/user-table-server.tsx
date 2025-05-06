import UserTable, { UserType } from './../components/user-table'
import { getAlbums } from '@/http/get-albums'
import { getPosts } from '@/http/get-posts'
import { getUsersMetaData } from '@/http/get-user-metadata'
import { getUsers } from '@/http/get-users'
import { saveUsersMeta } from '@/lib/fake-database'
import { formatDays } from '@/lib/format-days'
import {
  generateUserMetaData,
  getAllUsersMetaData,
} from '@/lib/generate-metatada'

const UserTableServer = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000))

  const [responseUser, responsePost, responseAlbum, responseMetaData] =
    await Promise.all([getUsers(), getPosts(), getAlbums(), getUsersMetaData()])

  const usersData = responseUser.users.reverse()
  const posts = responsePost.posts
  const albums = responseAlbum.albums

  const users: UserType[] = usersData.map((user) => {
    const meta = generateUserMetaData(user.id)

    const username =
      responseMetaData.users.filter((meta) => meta.user_id === user.id)[0]
        ?.username || meta.username

    const days = formatDays(
      responseMetaData.users.filter((meta) => meta.user_id === user.id)[0]
        ?.days || meta.days,
    )

    const city =
      responseMetaData.users.filter((meta) => meta.user_id === user.id)[0]
        ?.city || meta.city

    return {
      id: user.id,
      name: user.name,
      username,
      email: user.email,
      days,
      city,
      posts: posts.filter((post) => post.user_id === user.id).length,
      albums: albums.filter((album) => album.user_id === user.id).length,
      created_at: new Date(user.created_at),
    }
  })

  const userMeta = getAllUsersMetaData()

  await saveUsersMeta(userMeta)

  return <UserTable users={users} />
}

export default UserTableServer
