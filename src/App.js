import React, { useEffect } from "react";
import "./app.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  usersState,
  searchState,
  filterState,
  paginationState,
  paginatedUsers,
} from "./atom";
import Header from "./components/Header";
import Filters from "./components/Filters";
import UsersList from "./components/UsersList";
import Pagination from "./components/Pagination";
import { paginateUsers, shuffleUsers } from "./helpers";

function App() {
  const [{ loading, users }, setUsersData] = useRecoilState(usersState);
  const [_, setSearch] = useRecoilState(searchState);
  const [filter, setFilter] = useRecoilState(filterState);
  const shownUsers = useRecoilValue(paginatedUsers);
  const [
    { itemsPerPage, pageCount, pageNumber },
    setPaginationState,
  ] = useRecoilState(paginationState);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleSortByAge = (srtOrder) => {
    setFilter(srtOrder);
    setPaginationState((prevState) => ({
      ...prevState,
      pageNumber: 1,
    }));
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
    setUsersData((prev) => ({ ...prev, loading: true }));
    fetch("./users.json").then((data) =>
      data.json().then((res) => {
        const data = shuffleUsers(res);
        setUsersData({ users: data, loading: false });
        setPaginationState((prevState) => ({
          ...prevState,
          pageCount: Math.ceil(res.length / itemsPerPage),
        }));
      })
    );
  }, [itemsPerPage, setPaginationState, setUsersData]);

  useEffect(() => {
    paginateUsers(users, paginationState.pageNumber);
  }, [users]);
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
