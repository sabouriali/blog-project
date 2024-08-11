import { type FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";

import { type PostData, type Tag } from "../App";

type PostFormProps = {
  onSubmit: (data: PostData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function PostForm({ onSubmit, onAddTag, availableTags }: PostFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>عنوان</Form.Label>
              <Form.Control required ref={titleRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tag">
              <Form.Label>تگ</Form.Label>
              <CreatableSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidv4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prevTags) => [...prevTags, newTag]);
                }}
                isMulti
                placeholder="انتخاب"
                value={selectedTags.map((item) => {
                  return { label: item.label, value: item.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="markdown">
            <Form.Label>پست</Form.Label>
            <Form.Control required ref={markdownRef} as="textarea" rows={15} />
          </Form.Group>
          <Stack
            direction="horizontal"
            gap={2}
            className=" justify-content-start"
          >
            <Button type="submit" variant="light">
              انتشار پست
            </Button>
            <Button
              type="button"
              variant="outline-light"
              onClick={() => navigate("..")}
            >
              لغو
            </Button>
          </Stack>
        </Row>
      </Stack>
    </Form>
  );
}

export default PostForm;
