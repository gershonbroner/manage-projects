import { atom } from "recoil";
export const drawerState = atom({
  key: "drawerState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const buttonUseIstory = atom({
  key: "buttonUseIstory", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const isAdmin = atom({
  key: "isAdmin",
  default: false,
});
export const renderApi = atom({
  key: "renderApi",
  default: "",
});
