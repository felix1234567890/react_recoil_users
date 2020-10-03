import React, { useEffect, useState } from "react";
import "./app.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  usersState,
  shuffledPaginatedUsers,
  searchState,
  filterState,
} from "./atom";
import Header from "./components/Header";
import Filters from "./components/Filters";

function App() {
  const [{ loading }, setUsersData] = useRecoilState(usersState);
  const [_, setSearch] = useRecoilState(searchState);
  const [filter, setFilter] = useRecoilState(filterState);
  const adjustedUsers = useRecoilValue(shuffledPaginatedUsers);
  const [paginationState, setPaginationState] = useState({
    pageNumber: 1,
    itemsPerPage: 6,
    pageCount: null,
  });
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

  useEffect(() => {
    setUsersData((prev) => ({ ...prev, loading: true }));
    fetch("./users.json").then((data) =>
      data.json().then((res) => {
        setUsersData({ users: [...res], loading: false });
      })
    );
  }, [setUsersData]);
  return (
    <>
      <Header search={handleSearch} />
      <Filters sort={handleSortByAge} sortOrder={filter} />
    </>
  );
}

export default App;
