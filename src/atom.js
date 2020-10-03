import { atom } from "recoil";

export const usersState = atom({
  key: "users",
  default: { users: [], loading: false },
});
