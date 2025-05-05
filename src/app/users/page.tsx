import HeroSection from '@/components/hero-section'
import UserTable, { UserType } from '@/app/users/components/user-table'
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
import Link from 'next/link'

const UsersPage = async () => {
  const [responseUser, responsePost, responseAlbum, responseMetaData] =
    await Promise.all([
      await getUsers(),
      await getPosts(),
      await getAlbums(),
      await getUsersMetaData(),
    ])

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

  return (
    <>
      <HeroSection />

      <main className="max-w-[1300px] mx-auto px-8 mb-10">
        <section className="mt-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Usuários</h1>

          <Link
            href="/users/new"
            className="bg-[#7E50CE] text-white px-4 py-2 rounded-3xl"
          >
            Adicionar Usuário
          </Link>
        </section>

        <section className="mt-2">
          <UserTable users={users} />
        </section>
      </main>
    </>
  )
}

export default UsersPage
