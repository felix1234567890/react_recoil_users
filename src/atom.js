import { atom, selector } from "recoil";

export const usersState = atom({
  key: "users",
  default: { users: [], loading: false },
});

export const filterState = atom({
  key: "filter",
  default: { value: "", label: "None" },
});

export const searchState = atom({
  key: "searchTerm",
  default: "",
});

export const paginationState = atom({
  key: "pagination",
  default: {
    pageNumber: 1,
    itemsPerPage: 6,
    pageCount: 0,
  },
});

export const paginatedUsers = selector({
  key: "paginatedUsers",
  get: ({ get }) => {
    const { users } = get(usersState);
    const { pageNumber, itemsPerPage } = get(paginationState);
    const skip = (pageNumber - 1) * itemsPerPage;
    if (users.length > 0) {
      const shownUsers = users.slice(skip, skip + itemsPerPage);
      return shownUsers;
    }
  },
});

export const sortedUsers = selector({
  key: "sortedUsers",
  get: ({ get }) => {
    const { users } = get(usersState);
    const filter = get(filterState);
    let sortedUsers;

    switch (filter.value) {
      case "desc":
        sortedUsers = [...users].sort((a, b) => {
          return b.age - a.age;
        });
        break;
      case "asc":
        sortedUsers = [...users].sort((a, b) => {
          return a.age - b.age;
        });
        break;
      case "under40":
        sortedUsers = users
          .filter((user) => user.age < 40)
          .sort((a, b) => a.age - b.age);
        break;
      case "over40":
        sortedUsers = users
          .filter((user) => user.age > 40)
          .sort((a, b) => a.age - b.age);
        break;
      case "female":
        sortedUsers = users.filter((user) => user.gender === "female");
        break;
      case "male":
        sortedUsers = users.filter((user) => user.gender === "male");
        break;
      default:
        return users;
    }
    return sortedUsers;
  },
});

export const filteredUsers = selector({
  key: "filteredUsers",
  get: ({ get }) => {
    const { users } = get(usersState);
    const searchTerm = get(searchState);
    const val = new RegExp(searchTerm.toLowerCase(), "g");
    const searchedUsers = users.filter((user) => {
      if (user.country.toLowerCase().match(val)) return true;
      return false;
    });
    searchedUsers.sort((a, b) => a.country - b.country);
    return searchedUsers;
  },
});
