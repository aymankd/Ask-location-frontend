import React, { useEffect, useState } from "react";
import { Stack, Pagination } from "react-bootstrap";
import Post from "../../components/post";
import AddPost from "../../components/post/AddPost";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../../modules/posts";
import { Alert } from "react-bootstrap";

export default function Posts({ Pos, textTosearch }) {
  const dispatch = useDispatch();
  const { Posts, size } = useSelector((state) => state.posts);
  const [page, setpage] = useState(1);
  let items = [];
  for (let number = 1; number <= Math.ceil(size / 5); number++) {
    items.push(
      <Pagination.Item
        onClick={() => onPagechange(number)}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    loadPosts(1);
  }, [textTosearch]);
  const loadPosts = (pg) => {
    if (Pos) {
      var data;
      if (textTosearch)
        data = {
          langetude: Pos.coords.longitude,
          latitude: Pos.coords.latitude,
          page: pg,
          contenu: textTosearch,
        };
      else
        data = {
          langetude: Pos.coords.longitude,
          latitude: Pos.coords.latitude,
          page: pg,
        };

      dispatch(allPosts(data));
    }
  };
  const onPagechange = (e) => {
    console.log(e);
    loadPosts(e);
    setpage(e);
  };
  return (
    <>
      <Stack gap={5} className="col-md-5 mt-5 mx-auto">
        {Posts.length == 0 ? (
          <Alert variant="warning"> No Data Found </Alert>
        ) : null}
        {Posts.map((post) => (
          <Post key={post._id} id={post._id} post={post._source} />
        ))}
        <Pagination>{items}</Pagination>
      </Stack>
    </>
  );
}
