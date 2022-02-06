import ReactDOM from "react-dom";
import App from "./components/App";
import UserService from "./services/UserService";
import HttpService from "./services/HttpService";
import "./costum.scss";
const init = () => ReactDOM.render(<App />, document.getElementById("root"));

UserService.initKeycloak(init);
HttpService.configure();
