import { atom, selector } from "recoil";

export const usersState = atom({
  key: "users",
  default: { users: [], loading: false },
});
export const filterState = atom({
  key: "filter",
  default: {},
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
    pageCount: null,
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
    switch (filter.value) {
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
  key: "filteredUsers",
  get: ({ get }) => {
    const { users } = get(usersState);
    const searchTerm = get(searchState);
    // const searchedUsers = users.filter((user) => {
    //   if (user.country.toLowerCase().startsWith(searchTerm.toLowerCase()))
    //     return true;
    //   return false;
    // });
    // searchedUsers.sort((a, b) => a.country - b.country);
    // return paginateUsers(searchedUsers);
  },
});
