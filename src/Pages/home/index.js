import { useEffect, useState } from "react";
import SearchBar from "../../components/searchbar";
import Posts from "../../components/post/Posts";
import AddPost from "../../components/post/AddPost";
import { useDispatch } from "react-redux";
import { allFavourites } from "../../modules/posts";
import UserService from "../../services/UserService";
export default function Home() {
  const [position, setposition] = useState(null);

  navigator.geolocation.getCurrentPosition((pos) => {
    if (position == null) setposition(pos);
    console.log(pos);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(UserService.getUser());
    dispatch(allFavourites({ owner: UserService.getUser() }));
  }, []);

  return (
    <>
      <SearchBar />
      <br />
      <AddPost Pos={position} />
      {position ? <Posts Pos={position} /> : null}
      <br />
    </>
  );
}
