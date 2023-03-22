import { toBusiness } from "../magnusSpellingFix";

export default function Route() {
	const paths = typeof window !== "undefined" ? window.location.pathname.split("/") : "";
	const path = toBusiness(typeof window !== "undefined" ? paths[paths.length - 1] : "");


	return (
		<div className="flex-1">
			<button className="btn btn-ghost normal-case text-2xl" onClick={() => (window.location.href = "/home")}>
				{path}
			</button>
		</div>
	);
}
