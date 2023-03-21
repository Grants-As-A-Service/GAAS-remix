import { Link } from "@remix-run/react";

export const SideBar = ({ children, isLoggedIn, userType }: { children: React.ReactNode; userType: UserType; isLoggedIn: boolean }) => (
	<div className="drawer">
		<input id="drawer" type="checkbox" className="drawer-toggle" />
		<div className="drawer-content flex flex-col">{children}</div>
		<div className="drawer-side">
			<label htmlFor="drawer" className="drawer-overlay"></label>
			<ul className="menu p-4 w-80 bg-base-100 text-base-content">
				<li>
					<Link to="/home">GAAS</Link>
				</li>
				<li />
				{isLoggedIn ? (
					<>
						<li>
							<Link to="/home/profile">View Account</Link>
						</li>
						<li />
						<li>
							{userType === "buisness" ? (
								<Link to="/home/buisness/project/create">Create project</Link>
							) : (
								<Link to="/home/government/grant/create">Create grant</Link>
							)}
						</li>
					</>
				) : (
					<></>
				)}
			</ul>
		</div>
	</div>
);
