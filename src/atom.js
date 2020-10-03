import { atom, selector } from "recoil";

export const usersState = atom({
  key: "users",
  default: { users: [], loading: false },
});
export const filterState = atom({
  key: "filter",
  default: "",
});
export const searchState = atom({
  key: "searchTerm",
  default: "",
});
export const sortedUsers = selector({
  key: "filteredUsers",
  get: ({ get }) => {
    const users = get(usersState);
    const filter = get(filterState);
    switch (filter) {
      case "desc":
        return users.sort((a, b) => {
          return b.age - a.age;
        });
      case "asc":
        return users.sort((a, b) => {
          return a.age - b.age;
        });
      case "under40":
        return users
          .filter((user) => user.age < 40)
          .sort((a, b) => a.age - b.age);
      case "over40":
        return users
          .filter((user) => user.age > 40)
          .sort((a, b) => a.age - b.age);
      case "female":
        return users.filter((user) => user.gender === "female");
      case "male":
        return users.filter((user) => user.gender === "male");
      default:
        return users;
    }
  },
});
export const filteredUsers = selector({
  key: "searchedUsers",
  get: ({ get }) => {
    const users = get(usersState);
    const searchTerm = get(searchState);
    const searchedUsers = users.filter((user) => {
      if (user.country.toLowerCase().contains(searchTerm.toLowerCase()))
        return true;
      return false;
    });
    searchedUsers.sort((a, b) => a.country - b.country);
    return searchedUsers;
  },
});

const paginateUsers = (users, pageNumber = 1, itemsPerPage = 6) => {
  const skip = (pageNumber - 1) * itemsPerPage;
  if (users.length > 0) {
    const shownUsers = users.slice(skip, skip + itemsPerPage);
    return shownUsers;
  }
};
