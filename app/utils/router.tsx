export default {
	navigate: (route: string) => {
		if (window !== undefined) {
			window.location.href = route;
		}
	},
	navigateWithProps: (route: string, props: any) => {
		if (window !== undefined) {
			let uri = encodeURIComponent(JSON.stringify(props));
			window.location.href = route + "?props=" + uri;
		}
	},
	getProps: () => {
		if (window !== undefined) {
			let url = new URL(window.location.href);

			return JSON.parse(decodeURIComponent(url.searchParams.get("props") as string));
		} else {
			return {};
		}
	},
	current: () => {
		if (window !== undefined) {
			return window.location.pathname;
		}
	},
};
