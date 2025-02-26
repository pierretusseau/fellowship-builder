import { useSearchParams } from 'next/navigation'

const useUrlUpdater = (parameter: string, value?: string) => {
  const searchParams = useSearchParams()
  if (!value) return

  // console.log(parameter, value)
  // console.count('Updated url')

  const urlSearchParams = new URLSearchParams(searchParams.toString())
  // const concernedParam = urlSearchParams.get(parameter)
  urlSearchParams.set(parameter, value)
  const splittedUrlSearchParams = urlSearchParams.toString().split('&')
  // console.log('splittedUrlSearchParams', splittedUrlSearchParams)
  window.history.pushState(null, '', `?${splittedUrlSearchParams.join('&')}`)
}

export default useUrlUpdater