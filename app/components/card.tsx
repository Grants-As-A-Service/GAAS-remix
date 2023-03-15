import router from "~/utils/router";

export const Card = ({ title, info, data, route }: { title: string; info: string; route: string; data: any }) => {
	return (
		<button className="btn btn-lg btn-wide btn-primary" onClick={() => router.navigateWithProps(route, data)}>
			{title}
		</button>

		// <div className="card w-64 bg-primary text-primary-content">
		// 	<div className="card-body">
		// 		<div className="flex flex-row w-full justify-between">
		// 			<div className="flex flex-col">
		// 				<h2 className="card-title">{title}</h2>
		// 				<p className="text-primary-content">{info}</p>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};
