import React, { useEffect } from "react";
import "./app.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { usersState, shuffledPaginatedUsers, searchState } from "./atom";
import Header from "./components/Header";

function App() {
  const [{ loading }, setUsersData] = useRecoilState(usersState);
  const [_, setSearch] = useRecoilState(searchState);
  const adjustedUsers = useRecoilValue(shuffledPaginatedUsers);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    setUsersData((prev) => ({ ...prev, loading: true }));
    fetch("./users.json").then((data) =>
      data.json().then((res) => {
        setUsersData({ users: [...res], loading: false });
      })
    );
  }, [setUsersData]);
  return <Header search={handleSearch} />;
}

export default App;
