import { useState } from "react";
import SearchBar from "../../components/searchbar";
import Posts from "../../components/post/Posts";
import { useLocation } from "react-router-dom";

export default function Search() {
  const { state } = useLocation();
  const [position, setposition] = useState(null);
  console.log(state);

  navigator.geolocation.getCurrentPosition((pos) => {
    if (position == null) setposition(pos);
    console.log(pos);
  });

  return (
    <>
      <SearchBar />
      <br />

      {position ? <Posts Pos={position} textTosearch={state} /> : null}
      <br />
    </>
  );
}
