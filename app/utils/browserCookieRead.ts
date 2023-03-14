import Cookies from "js-cookie";
//special use case

export const getAuthState = () => {
	return Cookies.get("auth") ? true : false;
};


export const removeAuth = () => {
	return Cookies.remove("auth");
};
