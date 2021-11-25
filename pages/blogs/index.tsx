import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { Post } from "../../src/types";

type PageProps = {
  posts: Post[];
};

const BlogPage: NextPage<PageProps> = ({ posts }) => {
  const renderPosts = () => {
    return posts.map((post) => (
      <Link key={`#post-${post.id}`} href={`/blogs/${post.id}`}>
        <a
          style={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 6px 12px 0 rgba(0, 0, 0, 0.06)",
            padding: "8px 16px",
            borderRadius: "12px",
            margin: "8px 0",
          }}
        >
          <div>
            <h3>{post.title}</h3>
            <p>By: {post.userId}</p>
          </div>
        </a>
      </Link>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      {renderPosts()}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
