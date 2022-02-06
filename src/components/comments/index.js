import React, { useState } from "react";
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Container,
  Alert,
} from "react-bootstrap";
import Comment from "./Comment";
import HttpService from "../../services/HttpService";
import UserService from "../../services/UserService";
export default function Comments({ id }) {
  const [showcmt, setshowcmt] = useState(false);
  const [addcmt, setaddcmt] = useState(false);
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const username = UserService.getUsername();
  const Axios = HttpService.getAxiosClient();
  const SendComment = () => {
    var data = JSON.stringify({
      postId: id,
      contenu: comment,
      author: username,
    });

    var config = {
      method: "post",
      url: "/comment",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(response.data);
        let cmnts = comments;
        cmnts.push(response.data);
        setcomments(cmnts);
        setcomment("");
        setaddcmt(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const LoadComments = () => {
    var data = JSON.stringify({
      postId: id,
    });

    var config = {
      method: "get",
      url: `/comment?postId=${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    Axios(config)
      .then(function (response) {
        console.log(response.data);
        setcomments(response.data);
        setshowcmt(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Card.Footer>
        <div className="row gap-2">
          <div className="col d-grid gap-2">
            <Button
              variant="primary"
              onClick={() => setaddcmt(!addcmt)}
              size="lg"
            >
              {addcmt ? "Close" : "Add "} Comments
            </Button>
          </div>
          <div className="col d-grid gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                if (!showcmt) LoadComments();
                else setshowcmt(false);
              }}
              size="lg"
            >
              {showcmt ? "Hide" : "Show "} Comments
            </Button>
          </div>
        </div>
      </Card.Footer>
      {addcmt ? (
        <Card.Footer>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Add your Comment here"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={SendComment}>
              Send
            </Button>
          </InputGroup>
        </Card.Footer>
      ) : null}
      {showcmt ? (
        <Card.Body>
          <div
            style={{ maxHeight: "150px", overflow: "visible" }}
            className="overflow-auto"
          >
            <Container>
              {comments.length == 0 ? (
                <Alert variant="warning"> No Comments Found </Alert>
              ) : null}
              {comments.map((cmts) => (
                <Comment key={cmts._id} props={cmts} />
              ))}
            </Container>
          </div>
        </Card.Body>
      ) : null}
    </>
  );
}
