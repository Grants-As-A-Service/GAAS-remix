import Cookies from "js-cookie";
//special use case

export const removeAuth = () => {
	return Cookies.remove("auth");
};
