import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Stack } from "react-bootstrap";

function PostList() {
  const navigate = useNavigate();

  return (
    <>
      <Row>
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
    </>
  );
}

export default PostList;
