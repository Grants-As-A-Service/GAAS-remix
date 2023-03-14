export default {
	navigate: (route: string) => {
		if (window !== undefined) {
			window.location.href = route;
		}
	},
	navigateWithProps: (route: string, props: any) => {
		let uri = encodeURIComponent(JSON.stringify(props));
		window.location.href = route + "?props=" + uri;
	},
	getProps: () => {
		let url = new URL(window.location.href);

		return JSON.parse(decodeURIComponent(url.searchParams.get("props") as string));
	},
	current: () => {
		if (window !== undefined) {
			return window.location.pathname;
		}
	},
};
