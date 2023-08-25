import React, { useEffect, useState, useCallback } from "react";
import "./app.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  usersState,
  searchState,
  filterState,
  filteredUsers,
  sortedUsers,
} from "./atom";
import Header from "./components/Header";
import Filters from "./components/Filters";
import UsersList from "./components/UsersList";
import Pagination from "./components/Pagination";
import { shuffleUsers } from "./helpers";

function App() {
  const [{ loading }, setUsersData] = useRecoilState(usersState);
  const [search, setSearch] = useRecoilState(searchState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [shownUsers, setShownUsers] = useState([]);
  const filtered = useRecoilValue(filteredUsers);
  const sorted = useRecoilValue(sortedUsers);

  const [
    { itemsPerPage, pageNumber, pageCount },
    setPaginationState,
  ] = useState({
    pageNumber: 1,
    itemsPerPage: 6,
    pageCount: 0,
  });

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const paginateUsers = useCallback(
    (pageNumber = 1, itemsPerPage = 6) => {
      const skip = (pageNumber - 1) * itemsPerPage;
      if (currentUsers.length > 0) {
        const shownUsers = currentUsers.slice(skip, skip + itemsPerPage);
        setShownUsers(shownUsers);
      } else setShownUsers([]);
    },
    [currentUsers]
  );
  useEffect(() => {
    setPaginationState((prevState) => ({
      ...prevState,
      pageNumber: 1,
      pageCount: Math.ceil(filtered.length / itemsPerPage),
    }));
    setCurrentUsers(filtered);
  }, [filtered, itemsPerPage, search]);

  useEffect(() => {
    setPaginationState((prevState) => ({
      ...prevState,
      pageNumber: 1,
      pageCount: Math.ceil(sorted.length / itemsPerPage),
    }));
    setCurrentUsers(sorted);
  }, [sorted, itemsPerPage, filter]);

  useEffect(() => {
    paginateUsers();
  }, [currentUsers, paginateUsers]);

  const handleSortByAge = (srtOrder) => {
    setFilter(srtOrder);
  };

  const increaseNumber = () => {
    setPaginationState((prevState) => ({
      ...prevState,
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  const decreaseNumber = () => {
    setPaginationState((prevState) => ({
      ...prevState,
      pageNumber: prevState.pageNumber - 1,
    }));
  };
  useEffect(() => {
    paginateUsers(pageNumber);
  }, [pageNumber, paginateUsers]);

  useEffect(() => {
    setUsersData((prev) => ({ ...prev, loading: true }));
    fetch("./users.json").then((data) =>
      data.json().then((res) => {
        const data = shuffleUsers(res);
        setUsersData({ users: data, loading: false });
        setCurrentUsers(data);
        setPaginationState((prevState) => ({
          ...prevState,
          pageCount: Math.ceil(res.length / itemsPerPage),
        }));
      })
    );
  }, [itemsPerPage, setUsersData]);

  return (
    <>
      <Header search={handleSearch} />
      <Filters sort={handleSortByAge} sortOrder={filter} />
      <UsersList users={shownUsers} loading={loading} />
      <Pagination
        pageCount={pageCount}
        pageNumber={pageNumber}
        increaseNumber={increaseNumber}
        decreaseNumber={decreaseNumber}
      />
    </>
  );
}

export default App;
