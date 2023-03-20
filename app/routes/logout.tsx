import { redirect } from "@remix-run/node";

export async function loader() {
	console.log("here");

	return redirect("/", {
		headers: {
			"Set-Cookie": "auth=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
		},
	});
}
