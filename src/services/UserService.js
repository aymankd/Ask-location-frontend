import Keycloak from "keycloak-js";
const _kc = new Keycloak("/keycloak.json");

const initKeycloak = (Appinit) => {
  _kc
    .init({
      onLoad: "login-required",
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      }
      console.log(_kc.token);
      Appinit();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getUser = () => _kc.tokenParsed?.sub;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const RenderOnAnonymous = ({ children }) => (!isLoggedIn() ? children : null);

const RenderOnAuthenticated = ({ children }) =>
  isLoggedIn() ? children : null;

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  RenderOnAnonymous,
  RenderOnAuthenticated,
  getUser,
};

export default UserService;
