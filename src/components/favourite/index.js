import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Stack } from "react-bootstrap";
import Post from "../post/index";
import HttpService from "../../services/HttpService";
export default function FavouritePosts() {
  const axios = HttpService.getAxiosClient();

  const dispatch = useDispatch();
  const { Favourites } = useSelector((state) => state.posts);
  const [favs, setfavs] = useState([]);
  useEffect(async () => {
    var resFav = [];
    for (let index = 0; index < Favourites.length; index++) {
      const element = Favourites[index];
      const config = {
        method: "get",
        url: `http://localhost:3001/post/id?_id=${element.postId}`,
      };
      const resp = await axios(config);
      console.log(resp.data);
      resFav.push(resp.data);
    }
    setfavs(resFav);
  }, [Favourites]);

  return (
    <Stack gap={5} className="col-md-5 mt-5 mx-auto">
      {Favourites.length == 0 ? (
        <Alert variant="warning"> No Data Found </Alert>
      ) : null}

      {favs.map((fav) => {
        console.log(fav);
        return <Post key={fav._id} id={fav._id} post={fav._source} />;
      })}
    </Stack>
  );
}
