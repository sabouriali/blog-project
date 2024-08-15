import { usePost } from "../hooks/usePost";

import PostForm from "./PostForm";

import { type Tag, type PostData } from "../App";

type EditPostProps = {
  onSubmit: (id: string, data: PostData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function EditPost({ onSubmit, onAddTag, availableTags }: EditPostProps) {
  const selectedPost = usePost();

  return (
    <>
      <h2 className="mb-4">ویرایش پست</h2>
      <PostForm
        title={selectedPost.title}
        markdown={selectedPost.markdown}
        tags={selectedPost.tags}
        onSubmit={(data) => onSubmit(selectedPost.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default EditPost;
