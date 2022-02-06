import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, FormControl, Button } from "react-bootstrap";
import UserService from "../../services/UserService";
import { Link } from "react-router-dom";

function SearchBar() {
  const [search, setsearch] = useState("");
  let navigate = useNavigate();
  const onSearch = () => {
    navigate("/search", { state: search });
  };
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Link to="/">
          <Navbar.Brand>HOME</Navbar.Brand>
        </Link>
        <Link to="/favourite">
          <Navbar.Brand>FAVOURITE</Navbar.Brand>
        </Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={onSearch}>
              Search
            </Button>
          </Nav>
          <Nav className="d-flex">
            <Button
              variant="outline-light"
              onClick={() => UserService.doLogout()}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SearchBar;
