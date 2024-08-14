import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select";

import PostCard from "./PostCard";

import { type Tag } from "../App";
import { type PostCardProps } from "./PostCard";

type PostListProps = {
  availableTags: Tag[];
  posts: PostCardProps[];
};

function PostList({ availableTags, posts }: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return (
        (title === "" || post.title.toLocaleLowerCase().includes(title)) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            post.tags.some((postTag) => postTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, posts]);

  const navigate = useNavigate();

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>پست ها</h2>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Button onClick={() => navigate("/add")} variant="light">
              افزودن پست
            </Button>
            <Button variant="outline-light">ویرایش تگ ها</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>عنوان</Form.Label>
              <Form.Control
                type="text"
                placeholder="دنبال چی میگردی؟"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-3">
        {filteredPosts.map((post) => (
          <Col key={post.id}>
            <PostCard id={post.id} title={post.title} tags={post.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default PostList;
