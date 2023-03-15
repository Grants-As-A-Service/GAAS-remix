export const Table = ({ grants }: { grants: Array<Grant> }) => {
	return (
		<div className="overflow-x-auto">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th>Title</th>
						<th>Description</th>
						<th>Creator</th>
					</tr>
				</thead>
				<tbody>
					{grants.map((grant, i) => {
						return (
							<tr className="hover">
								<th>{i}</th>
								<td>{grant.title}</td>
								<td>{grant.description}</td>
								<td>{grant.creator}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
