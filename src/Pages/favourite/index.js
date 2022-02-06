import SearchBar from "../../components/searchbar";
import Post from "../../components/post/";
import { useDispatch, useSelector } from "react-redux";
import { allFavourites } from "../../modules/posts";
import { useEffect } from "react";
import UserService from "../../services/UserService";
import FavouritePosts from "../../components/favourite";
export default function Favourite() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(UserService.getUser());
    dispatch(allFavourites({ owner: UserService.getUser() }));
  }, []);

  return (
    <>
      <SearchBar />
      <br />
      <FavouritePosts />
    </>
  );
}
