import Builder from '@/components/Builder'
import Footer from '@/components/Footer'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams

  return (
    <div className="flex flex-col gap-4 w-[1200px] mx-auto min-h-screen items-center py-10 max-w-[100vw]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Builder params={searchParams} />
      </main>
      <Footer />
    </div>
  );
}
