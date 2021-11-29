import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

import { Post } from '../../src/types'

type PageProps = {
  posts: Post[]
  username: string
}

const BlogPage: NextPage<PageProps> = ({ posts, username }) => {
  const renderPosts = () => {
    return posts.map((post) => (
      <Link key={`#post-${post.id}`} href={`/blogs/${post.id}`}>
        <a
          style={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 6px 12px 0 rgba(0, 0, 0, 0.06)',
            padding: '8px 16px',
            borderRadius: '12px',
            margin: '8px 0',
          }}
        >
          <div>
            <h3>{post.title}</h3>
            <p>By: {post.userId}</p>
          </div>
        </a>
      </Link>
    ))
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {username && <p>You are logged in as {username}</p>}
      {renderPosts()}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()

  const profileResponse = await fetch('http://localhost:3000/api/profile')
  const profile = await profileResponse.json()
  const { username } = profile

  return {
    props: {
      posts,
      username,
    },
  }
}

export default BlogPage
