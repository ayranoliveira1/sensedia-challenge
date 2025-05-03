import Header from '@/components/header'
import HeroSection from '@/components/hero-section'

export default function Home() {
  return (
    <>
      <Header />

      <HeroSection />

      <main className="max-w-[1300px] mx-auto">
        <section className="mt-2">
          <h1 className="text-2xl font-bold">Usuários</h1>
        </section>
      </main>
    </>
  )
}
