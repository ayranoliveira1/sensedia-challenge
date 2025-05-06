import Link from 'next/link'
import UserTableServer from './components/user-table-server'
import HeroSection from '@/components/hero-section'
import { Suspense } from 'react'
import UserTableSkeleton from './components/user-table-skeleton'

const UsersPage = async () => {
  return (
    <>
      <HeroSection />

      <main className="max-w-[1300px] mx-auto px-8 mb-10">
        <section className="mt-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Usuários</h1>

          <Link
            href="/user/new"
            className="bg-[#7E50CE] text-white px-4 py-2 rounded-3xl"
          >
            Adicionar Usuário
          </Link>
        </section>

        <section className="mt-2">
          <Suspense fallback={<UserTableSkeleton />}>
            <UserTableServer />
          </Suspense>
        </section>
      </main>
    </>
  )
}

export default UsersPage
