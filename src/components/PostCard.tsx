import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import { type Tag } from "../App";

export type PostCardProps = {
  id: string;
  title: string;
  tags: Tag[];
};

function PostCard({ id, title, tags }: PostCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className="h-100 text-reset text-decoration-none"
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className=" fs-5 text-black">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
