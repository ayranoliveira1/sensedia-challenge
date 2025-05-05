import Footer from '@/components/footer'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import UserForm from '@/components/user-form'
import UserTable, { UserType } from '@/components/user-table'
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

export default async function Home() {
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
    }
  })

  const userMeta = getAllUsersMetaData()

  await saveUsersMeta(userMeta)

  return (
    <>
      <Header />

      <HeroSection />

      <main className="max-w-[1300px] mx-auto px-8 mb-10">
        <section className="mt-2">
          <h1 className="text-2xl font-bold">Usuários</h1>
        </section>

        <section className="mt-2">
          <UserTable users={users} />
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Registro</h2>

          <div className="mt-8">
            <UserForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
