import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";

import { type Tag } from "../App";

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

function EditTagsModal({
  availableTags,
  show,
  handleClose,
  onUpdateTag,
  onDeleteTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-black">ویرایش تگ ها</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-none"
                    onClick={() => onDeleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTagsModal;
