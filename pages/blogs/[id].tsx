import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import DefaultErrorPage from "next/error";

import { Post } from "../../src/types";

type PageProps = {
  post: Post;
};

const BlogDetailsPage: NextPage<PageProps> = ({ post }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "600px",
          flexDirection: "column",
          margin: "12px",
        }}
      >
        <h2>{post.title}</h2>
        <p style={{ fontStyle: "italic" }}>Written by: {post.userId}</p>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const paths = (await response.json()).map(
    (post: Post) => `/blogs/${post.id}`
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string);

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const post = (await response.json()).find((post: Post) => post.id === id);

  return {
    props: {
      post,
    },
  };
};

export default BlogDetailsPage;
