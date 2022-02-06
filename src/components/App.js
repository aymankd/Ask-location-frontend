import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreService from "../services/StoreService";
import UserService from "../services/UserService";
import Home from "../Pages/home";
import Search from "../Pages/search";
import Favourite from "../Pages/favourite";

const store = StoreService.setup();

const App = () => (
  <Provider store={store}>
    <Router>
      <UserService.RenderOnAuthenticated>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
      </UserService.RenderOnAuthenticated>
    </Router>
  </Provider>
);

export default App;
