import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { addPosts } from "../../modules/posts";
import { useDispatch } from "react-redux";
import UserService from "../../services/UserService";
export default function AddPost({ Pos }) {
  const dispatch = useDispatch();
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const username = UserService.getUsername();
  const AddPost = () => {
    dispatch(
      addPosts({
        titre: title,
        contenu: desc,
        owner: username,
        emplacement: {
          latitude: Pos.coords.latitude,
          langetude: Pos.coords.longitude,
        },
      })
    );
    settitle("");
    setdesc("");
  };
  return (
    <div className="col-md-5 mt-5 mx-auto">
      <Card border="dark" bg="secondary" text="white" style={{ width: "50" }}>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="email"
                placeholder="Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                value={desc}
                rows={5}
                onChange={(e) => setdesc(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Header>
          <div className="d-grid gap-2">
            <Button variant="light" onClick={AddPost}>
              Add Your Post
            </Button>
          </div>
        </Card.Header>
      </Card>
    </div>
  );
}
