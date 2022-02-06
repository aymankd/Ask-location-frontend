import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import Comments from "../comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as RHeart } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, DelFavourite, allFavourites } from "../../modules/posts";
import UserService from "../../services/UserService";

export default function Post({ post, id }) {
  const dispatch = useDispatch();
  const { Favourites } = useSelector((state) => state.posts);
  const [Heart, setHeart] = useState(false);

  const onHeartChange = () => {
    if (!Heart) {
      dispatch(addFavourite({ owner: UserService.getUser(), postId: id }));
      setHeart(!Heart);
    } else {
      dispatch(DelFavourite({ owner: UserService.getUser(), postId: id }));
      setHeart(!Heart);
      setTimeout(() => {
        dispatch(allFavourites({ owner: UserService.getUser() }));
      }, 100);
    }
  };

  useEffect(() => {
    if (Favourites.some((e) => e.postId === id)) setHeart(true);
  }, [Favourites]);

  return (
    <Card border="dark" style={{ width: "50" }}>
      <Card.Header>
        <Container>
          <Row>
            <Col md={10}>{post.owner} </Col>
            <Col md={{ span: 1, offset: 1 }}>
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                onClick={onHeartChange}
                icon={Heart ? SHeart : RHeart}
                size="lg"
              />
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Body>
        <Card.Title>{post.titre}</Card.Title>
        <Card.Text>{post.contenu}</Card.Text>
      </Card.Body>
      <Comments id={id} />
    </Card>
  );
}
