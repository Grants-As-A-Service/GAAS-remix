import Cookies from "js-cookie";

export const getAuthState = () => {
    return Cookies.get("auth") ? true : false;
};

export const removeAuth = () => {
    return Cookies.remove("auth");
};
