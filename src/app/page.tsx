import Footer from '@/components/footer'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import UserTable, { UserType } from '@/components/user-table'
import { getAlbums } from '@/http/get-albums'
import { getPosts } from '@/http/get-posts'
import { getUsers } from '@/http/get-users'

export default async function Home() {
  const [responseUser, responsePost, responseAlbum] = await Promise.all([
    await getUsers(),
    await getPosts(),
    await getAlbums(),
  ])

  const posts = responsePost.posts
  const albums = responseAlbum.albums

  const users: UserType[] = responseUser.users.map((user) => ({
    name: user.name,
    username: user.name,
    email: user.email,
    days: 'terça-feira',
    city: 'teste',
    posts: posts.filter((post) => post.user_id === user.id).length,
    albums: albums.filter((album) => album.user_id === user.id).length,
  }))

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
      </main>

      <Footer />
    </>
  )
}
