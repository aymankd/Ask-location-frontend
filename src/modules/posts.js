import { SUCCESS_SUFFIX } from "redux-axios-middleware";
import HttpService from "../services/HttpService";
import UserService from "../services/UserService";

const LIST_POST = "LIST_POST";
const ADD_POST = "ADD_POST";

const LIST_FAVOURITES = "LIST_FAVOURITES";
const ADD_FAVOURITE = "ADD_FAVOURITE";
const DEL_FAVOURITE = "DEL_FAVOURITE";

const initialUserState = {
  Posts: [],
  size: 0,
  search: "",
  Favourites: [],
};

const postsReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LIST_POST + SUCCESS_SUFFIX:
      return {
        Posts: action.payload.data.hits,
        size: action.payload.data.total.value,
        Favourites: state.Favourites,
        search: state.search,
      };
    case LIST_FAVOURITES + SUCCESS_SUFFIX:
      console.log(action.payload.data);
      return {
        Posts: state.Posts,
        size: state.size,
        Favourites: action.payload.data,
        search: state.search,
      };
    case ADD_POST + SUCCESS_SUFFIX:
      console.log(action.payload.data);
      return {
        Posts: [action.payload.data, ...state.Posts],
        size: state.size,
        Favourites: state.Favourites,
        search: state.search,
      };
    case ADD_FAVOURITE + SUCCESS_SUFFIX:
      console.log(action.payload.data);
      return {
        Posts: state.Posts,
        size: state.size,
        Favourites: state.Favourites,
        search: state.search,
      };
    case DEL_FAVOURITE + SUCCESS_SUFFIX:
      console.log(action.payload.data);
      return {
        Posts: state.Posts,
        size: state.size,
        Favourites: state.Favourites,
        search: state.search,
      };
    default:
      return state;
  }
};

export default postsReducer;

export const allPosts = (pos) => ({
  type: LIST_POST,
  payload: {
    request: {
      url: "/post",
      method: HttpService.HttpMethods.GET,
      params: pos,
    },
  },
});

export const addPosts = (post) => {
  return {
    type: ADD_POST,
    payload: {
      request: {
        url: "/post",
        method: HttpService.HttpMethods.POST,
        data: post,
      },
    },
  };
};

export const allFavourites = (pos) => ({
  type: LIST_FAVOURITES,
  payload: {
    request: {
      url: "/favourite",
      method: HttpService.HttpMethods.GET,
      params: pos,
    },
  },
});

export const addFavourite = (post) => {
  return {
    type: ADD_FAVOURITE,
    payload: {
      request: {
        url: "/favourite",
        method: HttpService.HttpMethods.POST,
        data: post,
      },
    },
  };
};

export const DelFavourite = (post) => {
  return {
    type: DEL_FAVOURITE,
    payload: {
      request: {
        url: "/favourite",
        method: HttpService.HttpMethods.DELETE,
        data: post,
      },
    },
  };
};
