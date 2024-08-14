import { Navigate, Outlet, useParams } from "react-router-dom";

import { type Post } from "../App";

type PostLayoutProps = {
  posts: Post[];
};

function PostLayout({ posts }: PostLayoutProps) {
  const { id } = useParams();

  const selectedPost = posts.find((post) => post.id === id);

  if (selectedPost == null) return <Navigate to="/404-not-found" replace />;

  return <Outlet context={selectedPost} />;
}

export default PostLayout;
