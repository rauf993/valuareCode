'use client'

import { useEffect, useState, JSX } from 'react'
import { useRouter } from 'next/navigation'


export default function HomePage (): JSX.Element | null {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
        router.push('/Home')
        setIsLoading(false)
    }

    checkAuth()
      .then(() => console.log('Auth ok'))
      .catch(() => console.log('Auth error'))
  }, [router])

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary' />
        <p className='mt-4'>Cargando...</p>
      </div>
    )
  }

  return null
}
