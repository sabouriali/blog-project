import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { useLocalStorage } from "./hooks/useLocalStorage";

import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import PostLayout from "./components/PostLayout";
import NotFound from "./components/NotFound";
import Post from "./components/Post";
import EditPost from "./components/EditPost";

export type Tag = {
  id: string;
  label: string;
};

export type PostData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Post = {
  id: string;
} & PostData;

export type RawPostData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type RawPost = {
  id: string;
} & RawPostData;

function App() {
  const [posts, setPosts] = useLocalStorage<RawPost[]>("POSTS", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const postsWithTags = useMemo(() => {
    return posts.map((post) => {
      return {
        ...post,
        tags: tags.filter((tag) => post.tagIds.includes(tag.id)),
      };
    });
  }, [posts, tags]);

  function onCreatePost({ tags, ...data }: PostData) {
    setPosts((prevPosts) => {
      return [
        ...prevPosts,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdatePost(id: string, { tags, ...data }: PostData) {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === id) {
          return { ...post, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return post;
        }
      });
    });
  }

  function onDeletePost(id: string) {
    setPosts((prevPosts) => {
      return prevPosts.filter((post) => post.id !== id);
    });
  }

  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <PostList
              posts={postsWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddPost
              onSubmit={onCreatePost}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<PostLayout posts={postsWithTags} />}>
          <Route index element={<Post onDelete={onDeletePost} />} />
          <Route
            path="edit"
            element={
              <EditPost
                onSubmit={onUpdatePost}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="/404-not-found" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
