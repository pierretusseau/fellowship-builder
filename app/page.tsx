import Builder from '@/components/Builder'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  console.log(searchParams)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Builder params={searchParams} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        &copy;{new Date().getFullYear()} Pierre &quot;Kobaru&quot; Tusseau
      </footer>
    </div>
  );
}
