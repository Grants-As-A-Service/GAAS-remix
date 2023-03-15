import { useState } from "react";
import { useRouter } from "~/components/hooks/navigator";
import { Title } from "~/components/title";

export default function GrantView() {
	const [grant] = useRouter<Grant | undefined>();

	return grant ? (
		<div className="w-full h-screen">
			<div className="px-5 w-full h-full">
				<div className="mb-2 py-4 text-center">
					<h1 className="font-title mb-2 text-4xl font-extrabold">{grant.title}</h1>
				</div>
				<h1 className="font-title mb-2 text-2xl pb-2">{grant.description}</h1>
				<h1 className="font-title mb-2 text-xl pb-1">Tags</h1>
				<div className="flex flex-row flex-wrap gap-5">
					{grant.tags.map((tag) => {
						return (
							<div className="badge badge-secondary badge-lg flex flex-row gap-2">
								<div>{tag} </div>
								<button>
									<span>&times;</span>
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}
