import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { LOCAL_STORAGE_KEY } from '../constants/local-storage'

const Home: NextPage = () => {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // store username in local storage
    window.localStorage.setItem(LOCAL_STORAGE_KEY.USERNAME, username)

    // redirect to blogs
    router.push('/blogs')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={handleChange} />
    </form>
  )
}

export default Home
