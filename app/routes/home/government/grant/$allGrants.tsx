import { LoaderArgs } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { Table } from "~/components/table";

export async function loader({ params }: LoaderArgs) {
	invariant(params.search, "Expected params.search");

	let search = params.search;
}

export default function GrantFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<div>
			<Table grants={[]} />
		</div>
	);
}
function invariant(userId: any, arg1: string) {
	throw new Error("Function not implemented.");
}
