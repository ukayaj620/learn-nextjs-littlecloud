import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'

const Home: NextPage = () => {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // store username in server
    fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    }).then(() => {
      // redirect to blogs
      router.push('/blogs')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={handleChange} />
    </form>
  )
}

export default Home
