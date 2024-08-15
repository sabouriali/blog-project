import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

import { usePost } from "../hooks/usePost";

type PostProps = {
  onDelete: (id: string) => void;
};

function Post({ onDelete }: PostProps) {
  const post = usePost();

  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>{post.title}</h2>
          {post.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {post.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Button
              variant="outline-light"
              onClick={() => {
                onDelete(post.id);
                navigate("/");
              }}
            >
              حذف
            </Button>
            <Button variant="light" onClick={() => navigate("./edit")}>
              ویرایش
            </Button>
            <Button variant="light" onClick={() => navigate("..")}>
              بازگشت
            </Button>
          </Stack>
        </Col>
      </Row>
      <Markdown>{post.markdown}</Markdown>
    </>
  );
}

export default Post;
